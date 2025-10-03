import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { startWorkoutSession, endWorkoutSession, submitPoseFrame } from "../api/WorkoutAPI";

const WebcamPoseDetection = ({ sportsId = 1 }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionIdRef = useRef(null);
  const startTimeRef = useRef(null);
  const [feedback, setFeedback] = useState(null);
  const sessionInitialized = useRef(false);

  // 상체 주요 랜드마크
  const UPPER_BODY_LANDMARKS = [
    "nose",
    "left_shoulder",
    "right_shoulder",
    "left_elbow",
    "right_elbow",
    "left_wrist",
    "right_wrist",
  ];

  // 📌 기준 자세 데이터 (정규화 좌표, 0~1)
  // 필요시 CSV 파일에서 fetch로 불러와도 됨
  const REFERENCE_POSE = {
    nose: [0.5, 0.3],
    left_shoulder: [0.4, 0.6],
    right_shoulder: [0.6, 0.6],
    left_elbow: [0.35, 0.8],
    right_elbow: [0.65, 0.8],
    left_wrist: [0.3, 1.0],
    right_wrist: [0.7, 1.0],
  };

  const setup = async () => {
    await tf.setBackend("webgl");
    await tf.ready();
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    setInterval(() => {
      detect(detector);
    }, 100);
  };

  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const poses = await detector.estimatePoses(video);

      // 포즈 좌표 전송
      if (poses && poses.length > 0) {
        const sessionId = sessionIdRef.current;
        const startTime = startTimeRef.current;

        if (sessionId && startTime) {
          const keypoints = poses[0].keypoints
            .filter(kp => kp.score > 0.3)  // 신뢰도 낮은 것 제외
            .map(kp => ({
              name: kp.name,
              x: parseFloat((1 - kp.x / videoWidth).toFixed(4)),  // 좌우 반전 + 정규화
              y: parseFloat((kp.y / videoHeight).toFixed(4)),
              score: parseFloat(kp.score.toFixed(3))
            }));

          const timestamp = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));

          // 0.5초마다 전송 (부하 감소)
          const shouldSend = Math.floor(timestamp * 2) !== Math.floor((timestamp - 0.1) * 2);

          if (shouldSend && keypoints.length > 0) {
            console.log('포즈 전송 중... timestamp:', timestamp, 'keypoints:', keypoints.length);
            submitPoseFrame(sessionId, timestamp, keypoints)
              .then(data => {
                console.log('서버 응답:', data);
                if (data && data.feedback) {
                  setFeedback(data.feedback);
                  console.log('피드백 설정:', data.feedback);
                }
              })
              .catch(err => {
                console.error('포즈 전송 실패:', err.response?.data || err.message);
              });
          }
        }
      }

      drawCanvas(poses, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (poses, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    if (poses && poses.length > 0) {
      const keypoints = poses[0].keypoints;

      // 관절 표시
      UPPER_BODY_LANDMARKS.forEach((keypointName) => {
        const keypoint = keypoints.find((k) => k.name === keypointName);
        if (keypoint && keypoint.score > 0.5) {
          const { x, y } = keypoint;
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
          // ctx.fillStyle = "green";
          // ctx.fillText(keypointName, x - 20, y - 20);
        }
      });
    }
  };

  useEffect(() => {
    if (sessionInitialized.current) return;
    sessionInitialized.current = true;

    let currentSessionId = null;

    setup();

    // 세션 시작
    startWorkoutSession(sportsId)
      .then(data => {
        currentSessionId = data.id;
        sessionIdRef.current = data.id;
        startTimeRef.current = Date.now();
        console.log('세션 시작됨:', data.id);
      })
      .catch(err => console.error("세션 시작 실패:", err));

    // 컴포넌트 unmount 시 세션 종료
    return () => {
      if (currentSessionId) {
        console.log('세션 종료:', currentSessionId);
        endWorkoutSession(currentSessionId).catch(err => console.error(err));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Webcam
        ref={webcamRef}
        mirrored={true}
        className="rounded-lg"
        style={{
          width: "640px",
          height: "480px",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{
          width: "640px",
          height: "480px",
          transform: "scaleX(-1)",
        }}
      />

      {/* 실시간 피드백 표시 */}
      {feedback && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-xs">
          <div className={`font-bold mb-2 ${
            feedback.status === 'good' ? 'text-green-400' :
            feedback.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {feedback.status === 'good' ? '✓ 좋습니다!' : '⚠ 교정이 필요합니다'}
          </div>
          {feedback.messages && feedback.messages.map((msg, idx) => (
            <div key={idx} className="text-sm">{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebcamPoseDetection;
 