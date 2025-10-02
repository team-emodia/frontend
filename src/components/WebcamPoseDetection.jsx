import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const WebcamPoseDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
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
      drawCanvas(poses, videoWidth, videoHeight, canvasRef);
    }
  };

  // 📌 자세 비교 함수
  const comparePose = (keypoints, tolerance = 0.1) => {
    let allMatch = true;
    for (const name of UPPER_BODY_LANDMARKS) {
      const kp = keypoints.find((k) => k.name === name);
      const ref = REFERENCE_POSE[name];
      if (kp && ref) {
        // 정규화 좌표 (0~1) 기준 비교
        const dx = kp.x / 640 - ref[0]; // 640은 임의, 실제 width로 normalize해도 됨
        const dy = kp.y / 480 - ref[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > tolerance) {
          allMatch = false;
        }
      }
    }
    return allMatch;
  };

  const drawCanvas = (poses, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    if (poses && poses.length > 0) {
      const keypoints = poses[0].keypoints;

      // ✅ 자세 일치 여부 확인
      const isMatch = comparePose(keypoints);

      // 텍스트 표시
      ctx.save();
      ctx.scale(-1, 1);

      // 좌우 뒤집힌 좌표계니까, x좌표를 영상 너비만큼 빼줘야 함
      ctx.font = "30px Arial";
      ctx.fillStyle = isMatch ? "lime" : "red";
      ctx.fillText(isMatch ? "MATCH" : "NOT MATCH", -videoWidth + 50, 50);

      ctx.restore();

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
    setup();
  }, []);

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        mirrored={true}
        className="rounded-lg"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{
          width: "100%",
          height: "100%",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
};

export default WebcamPoseDetection;
 