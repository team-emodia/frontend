import React, { useState, useEffect } from "react";
import WebcamPoseDetection from "../../components/WebcamPoseDetection";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); 

  // ===== Start2 상태 =====
  const emojis = [
    { name: "행복", icon: "😊" },
    { name: "설렘", icon: "🥰" },
    { name: "차분", icon: "😌" },
    { name: "보통", icon: "😐" },
    { name: "분노", icon: "😡" },
    { name: "불안", icon: "😟" },
    { name: "지침", icon: "😩" },
    { name: "우울", icon: "😔" },
  ];
  const [selectedEmoji, setSelectedEmoji] = useState("지침");
  const [intensity, setIntensity] = useState(50);
  const [memo, setMemo] = useState(""); // ✅ 메모 입력
  const [selectedMemos, setSelectedMemos] = useState([]); // ✅ 태그 선택
  const toggleMemo = (memoItem) => {
    setSelectedMemos((prev) =>
      prev.includes(memoItem)
        ? prev.filter((item) => item !== memoItem)
        : [...prev, memoItem]
    );
  };

  // ===== Start3 상태 =====
  const [activeTab, setActiveTab] = useState("스트레칭");

  // ===== Start4 & Start5 상태 =====
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);
  const toggleTimer = () => setIsRunning(!isRunning);

  // ===== Start6 상태 =====
  const [selectedMood, setSelectedMood] = useState(null);
  const [voiceOfMind, setVoiceOfMind] = useState("");

  return (
    <div className="w-full h-screen">
      {/* ====================== Start1 ====================== */}
      {page === 1 && (
        <div className="h-screen w-full flex flex-col bg-gradient-to-br from-purple-100 to-blue-100">
          <header className="flex items-center p-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center"></div>
            <span className="ml-2 font-medium text-gray-700">Emodia</span>
          </header>
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              오늘 기분은 어땠나요?
            </h1>
            <p className="text-lg text-gray-500 mb-10">
              가장 가까운 이모지를 선택하고, 강도를 슬라이더로 조절해 주세요
            </p>

            {/* ✅ 이모지 선택 */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {emojis.map((emoji) => (
                <div
                  key={emoji.name}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedEmoji === emoji.name
                      ? "border-indigo-500 shadow-md"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedEmoji(emoji.name)}
                >
                  <div
                    className={`text-4xl p-2 rounded-full mb-2 ${
                      selectedEmoji === emoji.name
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {emoji.icon}
                  </div>
                  <span className="text-gray-700">{emoji.name}</span>
                </div>
              ))}
            </div>

            {/* ✅ 강도 슬라이더 */}
            <div className="w-full px-4 mb-10">
              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>약함</span>
                <span>매우 쌤</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${intensity}%, #e5e7eb ${intensity}%, #e5e7eb 100%)`,
                }}
              />
            </div>

            {/* ✅ 메모 입력 & 태그 선택 */}
            <div className="w-full text-left">
              <label className="block text-gray-700 font-bold mb-2">메모</label>
              <input
                type="text"
                placeholder="짧게 남겨요. 오늘 무슨 일이 있었나요?"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-4"
              />

              <div className="flex flex-wrap gap-2 mb-8">
                {["업무", "휴식", "가족", "운동", "수면", "식사"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleMemo(item)}
                    className={`py-2 px-4 rounded-full border transition-colors ${
                      selectedMemos.includes(item)
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* 다음 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={() => setPage(3)}
                  className="py-3 px-8 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-600"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================== Start3 ====================== */}
      {page === 3 && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
          <div className="w-full max-w-4xl text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              지친 하루였군요. 지금은 몸과 마음을 풀어볼 시간이에요
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              오늘의 감정과 최근 기록을 바탕으로 맞춤 스트레칭을 준비했어요
            </p>

            <div className="flex justify-center space-x-4 mb-10">
              <button
                onClick={() => setActiveTab("스트레칭")}
                style={{
                  backgroundColor: activeTab === "스트레칭" ? "#6366F1" : "",
                }}
                className={`py-2 px-6 rounded-full ${
                  activeTab === "스트레칭" ? "text-white" : "text-gray-500"
                }`}
              >
                스트레칭
              </button>
              <button
                onClick={() => setActiveTab("호흡")}
                className={`py-2 px-6 rounded-full ${
                  activeTab === "호흡"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-500"
                }`}
              >
                호흡
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPage(4)}
                className="py-3 px-8 bg-indigo-500 text-white rounded-full"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== Start4 ====================== */}
      {page === 4 && (
        <div className="h-screen w-full bg-white flex flex-col items-center p-6">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            목·어깨 스트레칭 — 5분
          </h1>
          <div className="w-full max-w-2xl mx-auto mb-4">
            <WebcamPoseDetection />
          </div>
          {/* 타이머 */}
          <div className="w-full lg:w-72 bg-white border rounded-xl shadow p-4 flex flex-col items-center">
            <p className="text-gray-700 text-sm mb-1">세션 타이머</p>
            <div className="relative w-24 h-24 flex items-center justify-center mb-3">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#6366F1"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (timeLeft / 30) * 283}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-lg font-semibold">
                00:{timeLeft.toString().padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={toggleTimer}
              className="w-full py-1.5 bg-indigo-500 text-white rounded mb-2"
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={() => setPage(5)}
              className="w-full py-1.5 border border-indigo-500 text-indigo-500 rounded"
            >
              다음
            </button>
          </div>
        </div>
      )}

      {/* ====================== Start5 ====================== */}
      {page === 5 && (
        <div className="h-screen w-full bg-white flex flex-col items-center p-6">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            목·어깨 스트레칭 — 5분
          </h1>
          {/* 타이머 */}
          <div className="w-full lg:w-72 bg-white border rounded-xl shadow p-4 flex flex-col items-center">
            <p className="text-gray-700 text-sm mb-1">세션 타이머</p>
            <div className="relative w-24 h-24 flex items-center justify-center mb-3">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#6366F1"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (timeLeft / 30) * 283}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-lg font-semibold">
                00:{timeLeft.toString().padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={toggleTimer}
              className="w-full py-1.5 bg-indigo-500 text-white rounded mb-2"
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={() => setPage(6)}
              className="w-full py-1.5 border border-indigo-500 text-indigo-500 rounded"
            >
              다음
            </button>
          </div>
        </div>
      )}

      {/* ====================== Start6 ====================== */}
      {page === 6 && (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 relative">
          <h1 className="text-3xl font-bold mb-6">오늘도 고생하셨어요!</h1>
          <p className="mb-6 text-gray-600">힘들고 지친 몸과 마음, 조금은 나아졌나요?</p>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSelectedMood("만족스러웠어요")}
              className={`px-6 py-3 border rounded-full ${
                selectedMood === "만족스러웠어요" ? "bg-cyan-50" : "bg-white"
              }`}
            >
              만족스러웠어요 👍
            </button>
            <button
              onClick={() => setSelectedMood("별로였어요")}
              className={`px-6 py-3 border rounded-full ${
                selectedMood === "별로였어요" ? "bg-cyan-50" : "bg-white"
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
            className="w-72 p-3 border rounded-full mb-6"
          />
          <button
            onClick={() => {
              alert("오늘의 기록이 저장되었습니다!"); 
              navigate("/");
            }}
            className="px-8 py-3 bg-indigo-500 text-white rounded-full"
          >
            완료
          </button>
        </div>
      )}
    </div>
  );
};

export default StartPage;
