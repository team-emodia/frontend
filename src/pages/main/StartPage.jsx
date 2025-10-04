// src/pages/main/StartPage.jsx
import React, { useState, useEffect } from "react";
import WebcamPoseDetection from "../../components/WebcamPoseDetection";
import EmotionRecorder from "../../components/EmotionRecorder";
import { useNavigate } from "react-router-dom";
import buttonGradient from "../../assets/bg/button-gradient.svg";
import ExerciseVideo from "../../components/ExerciseVideo";

// API
import { saveEmotionRecord } from "../../api/EmotionAPI";
import { saveWorkoutRecord } from "../../api/WorkoutAPI";

// ✅ 공통 Header
import Header from "../../common/Header";

const StartPage = () => {
  const [page, setPage] = useState(1);
  const [useWebcam, setUseWebcam] = useState(false);
  const navigate = useNavigate();

  // ===== Start2 상태 (감정 기록 데이터) =====
  const [emotionData, setEmotionData] = useState({
    selectedEmoji: "tired", // id (영어)
    selectedEmojiName: "지침", // name (한글)
    intensity: 50,
    memo: "",
    selectedMemos: [],
  });

  // ===== Start3 상태 =====
  const [activeTab, setActiveTab] = useState("스트레칭");
  const [selectedExercise, setSelectedExercise] = useState({ title: "", videoUrl: "" });

  // ===== Start4 & Start5 상태 =====
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
      setTimeLeft(30);
    } else {
      alert("모든 동작이 끝났습니다.");
    }
  };
  const handleRest = () => {
    setTimeLeft(20);
    setIsRunning(true);
  };
  const toggleMute = () => setIsMuted(!isMuted);

  // ===== Start6 상태 =====
  const [selectedMood, setSelectedMood] = useState(null);
  const [voiceOfMind, setVoiceOfMind] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 감정 기록 저장 핸들러
  const handleEmotionSave = async (data) => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      await saveEmotionRecord({
        date: today,
        emotion: data.selectedEmoji, // 이제 id (영어)를 전송
        memo: data.memo,
      });

      setEmotionData(data); // 로컬 상태 업데이트 (selectedEmoji, selectedEmojiName 등 포함)
      alert("감정이 기록되었습니다.");
      setPage(3); // 다음 페이지로 이동
    } catch (error) {
      console.error("감정 기록 저장 실패:", error);
      alert("감정 기록 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 운동 시작 핸들러
  const handleStartExercise = (title, videoUrl, cam) => {
    setUseWebcam(cam);
    setSelectedExercise({ title, videoUrl });
    setPage(4);
  };

  // ✅ 최종 저장 핸들러
  const handleSave = async () => {
    setLoading(true);
    try {
      const date = new Date().toISOString().split("T")[0];

      // ✅ 백엔드 필드명(snake_case)에 맞게 데이터 전송
      await saveEmotionRecord({
        date,
        emotion: emotionData.selectedEmoji,
        intensity: emotionData.intensity,
        memo: emotionData.memo,
        tags: emotionData.selectedMemos,
        mood_after: selectedMood,      // moodAfter -> mood_after
        voice_of_mind: voiceOfMind,  // voiceOfMind -> voice_of_mind
      });

      // TODO: 운동 기록 저장 API 구현 필요
      // await saveWorkoutRecord({
      //   date,
      //   workout: "목·어깨 스트레칭",
      //   duration: 5,
      //   poseAccuracy: useWebcam ? "MATCH 80%" : "Not Checked",
      // });

      alert("오늘의 기록이 저장되었습니다!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      {/* ====================== Start1 ====================== */}
      {page === 1 && (
        <div className="h-screen w-full flex flex-col bg-gradient-to-br from-purple-100 to-blue-100">
          <Header variant="default" /> {/* ✅ 공통 헤더 */}
          <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">
              Ready to start with Emodia?
            </h1>
            <button
              onClick={() => setPage(2)}
              className="px-8 py-3 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              START
            </button>
          </main>
        </div>
      )}

      {/* ====================== Start2 ====================== */}
      {page === 2 && (
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header variant="default" />
          <main className="flex flex-1 flex-col items-center justify-center p-6">
            <EmotionRecorder
              initialData={emotionData}
              onSave={handleEmotionSave}
              onCancel={() => setPage(1)}
              showDetails={false}
            />
          </main>
        </div>
      )}

      {/* ====================== Start3 ====================== */}
      {page === 3 && (
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header variant="default" />
          <main className="flex flex-1 flex-col items-center p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {emotionData.selectedEmojiName} 하루였군요. 지금은 몸과 마음을 풀어볼 시간이에요
            </h1>
            <p className="text-gray-600 mb-6">
              오늘의 감정과 최근 기록을 바탕으로 맞춤 스트레칭을 준비했어요
            </p>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("스트레칭")}
                className={`px-6 py-2 rounded-full ${
                  activeTab === "스트레칭"
                    ? "bg-indigo-500 text-white"
                    : "border text-gray-600"
                }`}
              >
                스트레칭
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 relative">
                <p className="text-lg font-bold mb-2">목 왼쪽 풀기</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartExercise("목 왼쪽 풀기", "http://127.0.0.1:8000/media/videos/1.mp4", false)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 OFF 시작
                  </button>
                  <button
                    onClick={() => handleStartExercise("목 왼쪽 풀기", "http://127.0.0.1:8000/media/videos/1.mp4", true)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 ON 시작
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 relative">
                <p className="text-lg font-bold mb-2">목 오른쪽 풀기</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartExercise("목 오른쪽 풀기", "http://127.0.0.1:8000/media/videos/1.mp4", false)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 OFF 시작
                  </button>
                  <button
                    onClick={() => handleStartExercise("목 오른쪽 풀기", "http://127.0.0.1:8000/media/videos/1.mp4", true)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 ON 시작
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 relative">
                <p className="text-lg font-bold mb-2">어깨 오른쪽 풀기</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartExercise("어깨 오른쪽 풀기", "http://127.0.0.1:8000/media/videos/2.mp4", false)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 OFF 시작
                  </button>
                  <button
                    onClick={() => handleStartExercise("어깨 오른쪽 풀기", "http://127.0.0.1:8000/media/videos/2.mp4", true)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 ON 시작
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 relative">
                <p className="text-lg font-bold mb-2">어깨 왼쪽 풀기</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartExercise("어깨 왼쪽 풀기", "http://127.0.0.1:8000/media/videos/2.mp4", false)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 OFF 시작
                  </button>
                  <button
                    onClick={() => handleStartExercise("어깨 왼쪽 풀기", "http://127.0.0.1:8000/media/videos/2.mp4", true)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 ON 시작
                  </button>
                </div>
              </div>
            </div>



            <div className="flex justify-between w-full max-w-md">
              <button
                onClick={() => setPage(2)}
                className="px-6 py-3 border rounded-lg"
              >
                이전
              </button>
              <button
                onClick={() => setPage(6)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg"
              >
                건너뛰기
              </button>
            </div>
          </main>
        </div>
      )}

      {/* ====================== Start4 ====================== */}
      {page === 4 && (
        <div className="flex flex-col min-h-screen bg-white">
          <Header variant="default" />
          <main className="flex flex-1 p-6 flex-col items-center">
            <h1 className="text-2xl font-bold mb-2">{selectedExercise.title}</h1>
            <p className="text-gray-600 mb-6">추천 · 지침 완화 · 초급</p>

            <div
              className={`w-full max-w-6xl grid gap-6 ${
                useWebcam ? "grid-cols-2" : "grid-cols-1 justify-items-center"
              }`}
            >
                <div className={useWebcam ? "w-full" : "w-1/2"}>
                    <ExerciseVideo videoUrl={selectedExercise.videoUrl} title={selectedExercise.title} />
                </div>

              {/* 웹캠 */}
              {useWebcam && (
                <div className="border rounded-xl flex flex-col items-center justify-center p-4">
                  <p className="font-bold mb-2">웹캠 자세 확인</p>
                  <WebcamPoseDetection />
                </div>
              )}
            </div>



            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setPage(3)}
                className="px-6 py-3 border rounded-lg"
              >
                이전
              </button>
              <button
                onClick={() => setPage(6)}
                className="px-6 py-3 border rounded-lg"
              >
                완료로 표시
              </button>
              <button
                onClick={() => setPage(6)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg"
              >
                저장하고 돌아가기
              </button>
            </div>
          </main>
        </div>
      )}

      {/* ====================== Start6 ====================== */}
      {page === 6 && (
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header variant="default" />
          <main className="flex flex-1 flex-col items-center justify-center p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              오늘도 고생하셨어요!
            </h1>
            <p className="text-gray-600 mb-6">
              힘들고 지친 몸과 마음, 조금은 나아졌나요?
            </p>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedMood("만족스러웠어요")}
                className={`px-6 py-3 border rounded-full ${
                  selectedMood === "만족스러웠어요"
                    ? "bg-indigo-100"
                    : "bg-white"
                }`}
              >
                만족했어요 👍
              </button>
              <button
                onClick={() => setSelectedMood("별로였어요")}
                className={`px-6 py-3 border rounded-full ${
                  selectedMood === "별로였어요" ? "bg-indigo-100" : "bg-white"
                }`}
              >
                별로였어요 👎
              </button>
            </div>

            <input
              type="text"
              placeholder="고객의 소리함"
              value={voiceOfMind}
              onChange={(e) => setVoiceOfMind(e.target.value)}
              className="w-80 p-3 border rounded-full mb-6"
            />

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 text-white rounded-full mb-6"
              style={{ backgroundImage: `url(${buttonGradient})` }}
            >
              {loading ? "저장 중..." : "오늘의 감정 기록하기"}
            </button>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => navigate("/calendar")}
                className="px-6 py-3 border rounded-lg"
              >
                캘린더로 이동
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 border rounded-lg"
              >
                홈으로 이동
              </button>
              <button
                onClick={() => setPage(3)}
                className="px-6 py-3 border rounded-lg"
              >
                이전
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Tip: 기록을 남기면 내일 더 정확한 추천을 받아요
            </p>
          </main>
        </div>
      )}
    </div>
  );
};

export default StartPage;
