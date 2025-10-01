import React, { useState, useEffect } from "react";

export const Start4 = () => {
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

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center p-4 md:p-6 overflow-hidden">
      {/* 제목 영역 */}
      <div className="w-full max-w-5xl flex-shrink-0">
        <h1 className="text-xl md:text-2xl font-bold mb-1 truncate">
          목·어깨 스트레칭 — 5분
        </h1>
        <p className="text-xs text-gray-500 mb-4">추천 · 지침 완화 · 초급</p>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
        {/* 비디오 영역 */}
        <div className="flex-1 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow flex items-center justify-center min-h-[200px]">
          <button className="w-14 h-14 bg-white rounded-full shadow flex items-center justify-center">
            <span className="text-indigo-500 text-xl">▶</span>
          </button>
        </div>

        {/* 세션 타이머 */}
        <div className="w-full lg:w-72 bg-white border rounded-xl shadow p-4 flex flex-col items-center flex-shrink-0">
          <p className="text-gray-700 text-sm mb-1">세션 타이머</p>
          <p className="text-xs text-gray-500 mb-3">세트 1 / 3</p>
          <div className="relative w-24 h-24 flex items-center justify-center mb-3">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
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
            <span className="text-lg font-semibold">00:{timeLeft.toString().padStart(2, "0")}</span>
          </div>

          <button
            onClick={toggleTimer}
            className="w-full py-1.5 rounded-md bg-indigo-500 text-white text-sm font-medium mb-2"
          >
            {isRunning ? "일시정지" : "시작"}
          </button>
          <button className="w-full py-1.5 rounded-md border border-indigo-500 text-indigo-500 text-sm font-medium mb-2">
            다음 동작 ▶
          </button>

          <div className="flex gap-2 w-full mb-3">
            <button className="flex-1 py-1.5 rounded-md bg-gray-100 text-gray-700 text-xs">
              휴식 20초
            </button>
            <button className="flex-1 py-1.5 rounded-md bg-gray-100 text-gray-700 text-xs">
              소리 끄기 🔇
            </button>
          </div>

          <div className="w-full text-left text-xs text-gray-600">
            <p className="mb-0.5">폼 체크</p>
            <p>- 어깨는 아래로</p>
            <p>- 호흡은 코로 들이마시기</p>
          </div>
        </div>
      </div>

      {/* 세션 구성 */}
      <div className="w-full max-w-5xl mt-4 flex-shrink-0">
        <h2 className="text-sm font-semibold mb-2">세션 구성</h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 border rounded-md">1) 목 좌/우 스트레칭 — 60초</div>
          <div className="p-2 border rounded-md">2) 어깨 돌리기 — 45초</div>
          <div className="p-2 border rounded-md">3) 견갑골 풀기 — 45초</div>
          <div className="p-2 border rounded-md">4) 호흡 이완 — 60초</div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="w-full max-w-5xl flex justify-end gap-2 mt-4 flex-shrink-0">
        <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
          완료로 표시
        </button>
        <button className="px-3 py-2 rounded-md bg-indigo-500 text-white text-xs font-medium">
          저장하고 돌아가기
        </button>
      </div>
    </div>
  );
};