// src/pages/intro/Intro5.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Intro5 = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        루틴은 시간을 기억합니다
      </h2>
      <p className="text-gray-600 mb-12 text-center">
        매일 같은 시간에 부드럽게 시작해요
      </p>

      {/* 시간 선택 UI (간단 Mockup) */}
      <div className="bg-purple-50 rounded-2xl p-8 max-w-lg w-full mb-12 shadow">
        <div className="flex justify-center gap-2 mb-6">
          {["06:30", "07:00", "08:30", "09:00"].map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-sm ${
                t === "08:30"
                  ? "bg-purple-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="text-3xl font-bold text-center">08 : 30 PM</div>
        <div className="flex justify-center gap-2 mt-6">
          {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
            <div
              key={d}
              className={`px-4 py-2 rounded-full ${
                d === "토" || d === "일"
                  ? "bg-pink-100 text-pink-600"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">주말엔 쉬기</span>
          <div className="w-12 h-6 bg-purple-500 rounded-full relative">
            <div className="w-6 h-6 bg-white rounded-full absolute right-0"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
        >
          나중에 설정
        </button>
        <button
          onClick={() => navigate("/main")}
          className="px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Intro5;
