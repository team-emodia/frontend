// src/pages/main/StartPage.jsx
import React, { useState, useEffect } from "react";
import WebcamPoseDetection from "../../components/WebcamPoseDetection";
import EmotionRecorder from "../../components/EmotionRecorder";
import { useNavigate } from "react-router-dom";
import buttonGradient from "../../assets/bg/button-gradient.svg";

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
    selectedEmoji: "지침",
    intensity: 50,
    memo: "",
    selectedMemos: [],
  });

  // ===== Start3 상태 =====
  const [activeTab, setActiveTab] = useState("스트레칭");

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
  const handleEmotionSave = (data) => {
    setEmotionData(data);
    setPage(3); // 다음 페이지로 이동
  };

  // ✅ 최종 저장 핸들러
  const handleSave = async () => {
    setLoading(true);
    try {
      const date = new Date().toISOString().split("T")[0];

      await saveEmotionRecord({
        date,
        emotion: emotionData.selectedEmoji,
        intensity: emotionData.intensity,
        memo: emotionData.memo,
        tags: emotionData.selectedMemos,
        moodAfter: selectedMood,
        voiceOfMind,
      });

      await saveWorkoutRecord({
        date,
        workout: "목·어깨 스트레칭",
        duration: 5,
        poseAccuracy: useWebcam ? "MATCH 80%" : "Not Checked",
      });

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
              지친 하루였군요. 지금은 몸과 마음을 풀어볼 시간이에요
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
              <button
                onClick={() => setActiveTab("호흡")}
                className={`px-6 py-2 rounded-full ${
                  activeTab === "호흡"
                    ? "bg-indigo-500 text-white"
                    : "border text-gray-600"
                }`}
              >
                호흡
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 relative">
                <span className="absolute top-2 left-2 bg-indigo-200 text-xs px-2 py-1 rounded">
                  추천
                </span>
                <p className="text-lg font-bold mb-2">목·어깨 스트레칭</p>
                <p className="text-sm text-gray-600 mb-4">5분 · 초급</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setUseWebcam(false);
                      setPage(4);
                    }}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 OFF 시작
                  </button>
                  <button
                    onClick={() => {
                      setUseWebcam(true);
                      setPage(4);
                    }}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    캠 ON 시작
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 relative">
                <span className="absolute top-2 left-2 bg-gray-200 text-xs px-2 py-1 rounded">
                  부드러움
                </span>
                <p className="text-lg font-bold mb-2">허리·고관절 스트레칭</p>
                <p className="text-sm text-gray-600 mb-4">10분 · 중급</p>
                <button
                  onClick={() => alert("허리·고관절 스트레칭 자세 보기 준비중")}
                  className="px-4 py-2 bg-indigo-500 text-white rounded"
                >
                  자세 보기
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
              <div className="p-4 border rounded-lg text-left text-sm text-gray-600">
                <p className="font-bold mb-2">왜 이 추천인가요?</p>
                <p>
                  최근 7일 중 4회 '지침/우울' 기록 + 근육 뻐근 메모 → 목·허리 스트레칭 추천
                </p>
              </div>
              <div className="p-4 border rounded-lg text-left text-sm text-gray-600">
                <p className="font-bold mb-2">호흡 루틴도 함께 해볼까요?</p>
                <p className="mb-2">4-7-8 호흡법 3분 · 이완 효과</p>
                <button
                  onClick={() => setActiveTab("호흡")}
                  className="px-4 py-2 border rounded"
                >
                  추가하기
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => alert("다른 추천 보기 준비중")}
                className="px-6 py-3 border rounded-lg"
              >
                다른 추천 보기
              </button>
              <button
                onClick={() => setPage(4)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg"
              >
                바로 시작
              </button>
              <button
                onClick={() => setPage(2)}
                className="px-6 py-3 border rounded-lg"
              >
                이전
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
            <h1 className="text-2xl font-bold mb-2">목·어깨 스트레칭 — 5분</h1>
            <p className="text-gray-600 mb-6">추천 · 지침 완화 · 초급</p>

            <div
              className={`w-full max-w-6xl grid gap-6 ${
                useWebcam ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              {/* 영상 */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center h-96">
                <button className="text-5xl text-white bg-indigo-500 rounded-full p-4 shadow-lg">
                  ▶
                </button>
              </div>

              {/* 웹캠 */}
              {useWebcam && (
                <div className="border rounded-xl flex flex-col items-center justify-center p-4">
                  <p className="font-bold mb-2">웹캠 자세 확인</p>
                  <WebcamPoseDetection />
                </div>
              )}

              {/* 타이머 */}
              <div className="border rounded-xl p-6 flex flex-col items-center">
                <p className="font-bold mb-2">세션 타이머</p>
                <p className="text-sm text-gray-600 mb-4">
                  세트 1 / 3 — 동작 {currentStep}
                </p>
                <div className="w-32 h-32 rounded-full border-8 border-indigo-300 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">{timeLeft}초</span>
                </div>
                <button
                  onClick={toggleTimer}
                  className="px-4 py-2 bg-indigo-500 text-white rounded mb-2"
                >
                  {isRunning ? "일시정지" : "시작"}
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 border rounded mb-2"
                >
                  다음 동작 ▶
                </button>
                <button
                  onClick={handleRest}
                  className="px-4 py-2 border rounded mb-2"
                >
                  휴식 20초
                </button>
                <button
                  onClick={toggleMute}
                  className="px-4 py-2 border rounded mb-4"
                >
                  {isMuted ? "소리 켜기 🔊" : "소리 끄기 🔇"}
                </button>
                <div className="text-sm text-left w-full">
                  <p>폼 체크</p>
                  <ul className="list-disc ml-4 text-gray-600">
                    <li>어깨는 아래로</li>
                    <li>호흡은 코로 들이마시기</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 세션 구성 */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-4xl">
              <div className="p-4 border rounded-lg text-sm">
                1) 목 좌/우 스트레칭 — 60초
              </div>
              <div className="p-4 border rounded-lg text-sm">
                2) 어깨 돌리기 — 45초
              </div>
              <div className="p-4 border rounded-lg text-sm">
                3) 견갑골 풀기 — 45초
              </div>
              <div className="p-4 border rounded-lg text-sm">
                4) 호흡 이완 — 60초
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setPage(3)}
                className="px-6 py-3 border rounded-lg"
              >
                이전
              </button>
              <button
                onClick={() => setPage(5)}
                className="px-6 py-3 border rounded-lg"
              >
                완료로 표시
              </button>
              <button
                onClick={() => setPage(5)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg"
              >
                저장하고 돌아가기
              </button>
            </div>
          </main>
        </div>
      )}

      {/* ====================== Start5 ====================== */}
      {page === 5 && (
        <div className="flex flex-col min-h-screen bg-white">
          <Header variant="default" />
          <main className="flex flex-1 p-6 flex-col items-center">
            <h1 className="text-2xl font-bold mb-2">목·어깨 스트레칭 — 5분</h1>
            <p className="text-gray-600 mb-6">추천 · 지침 완화 · 초급</p>

            <div
              className={`w-full max-w-6xl grid gap-6 ${
                useWebcam ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center h-96">
                <button className="text-5xl text-white bg-indigo-500 rounded-full p-4 shadow-lg">
                  ▶
                </button>
              </div>

              {useWebcam && (
                <div className="border rounded-xl flex flex-col items-center justify-center p-4">
                  <p className="font-bold mb-2">웹캠 자세 확인</p>
                  <WebcamPoseDetection />
                </div>
              )}

              <div className="border rounded-xl p-6 flex flex-col items-center">
                <p className="font-bold mb-2">세션 타이머</p>
                <p className="text-sm text-gray-600 mb-4">세트 2 / 3</p>
                <div className="w-32 h-32 rounded-full border-8 border-indigo-300 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">{timeLeft}초</span>
                </div>
                <button
                  onClick={toggleTimer}
                  className="px-4 py-2 bg-indigo-500 text-white rounded mb-2"
                >
                  {isRunning ? "일시정지" : "시작"}
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 border rounded mb-2"
                >
                  다음 동작 ▶
                </button>
                <button
                  onClick={handleRest}
                  className="px-4 py-2 border rounded mb-2"
                >
                  휴식 20초
                </button>
                <button
                  onClick={toggleMute}
                  className="px-4 py-2 border rounded mb-4"
                >
                  {isMuted ? "소리 켜기 🔊" : "소리 끄기 🔇"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-4xl">
              <div className="p-4 border rounded-lg text-sm">
                1) 목 좌/우 스트레칭 — 60초
              </div>
              <div className="p-4 border rounded-lg text-sm">
                2) 어깨 돌리기 — 45초
              </div>
              <div className="p-4 border rounded-lg text-sm">
                3) 견갑골 풀기 — 45초
              </div>
              <div className="p-4 border rounded-lg text-sm">
                4) 호흡 이완 — 60초
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setPage(4)}
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
              placeholder="마음의 소리함"
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
                onClick={() => setPage(5)}
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
