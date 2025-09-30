// src/pages/intro/Intro2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import illustrationYoga from "../../assets/illustrations/illustration-yoga.svg";
import illustrationChart from "../../assets/illustrations/illustration-chart-weekly.svg";
import emojiHappy from "../../assets/emoji/emoji-happy.svg";

const Intro2 = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h2 className="text-2xl md:text-3xl font-bold italic mb-12">
        <span className="italic">Emodia</span>로 매일 달라지는 3가지
      </h2>

      {/* 카드 3개 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* 카드 1: 감정 기록 */}
        <div className="bg-purple-100 rounded-2xl p-6 flex flex-col items-center">
          <p className="font-semibold mb-2">감정·몸상태 기록</p>
          <p className="text-sm text-gray-600 mb-4">하루 1분이면 충분해요 😊</p>
          <img src={emojiHappy} alt="감정 기록" className="w-12 h-12" />
        </div>

        {/* 카드 2: 맞춤 루틴 */}
        <div className="bg-purple-100 rounded-2xl p-6 flex flex-col items-center">
          <p className="font-semibold mb-2">맞춤 루틴 제안</p>
          <p className="text-sm text-gray-600 mb-4">스트레칭 · 호흡 습관 🌿</p>
          <img src={illustrationYoga} alt="맞춤 루틴" className="w-20 h-20" />
        </div>

        {/* 카드 3: 주간 인사이트 */}
        <div className="bg-purple-100 rounded-2xl p-6 flex flex-col items-center">
          <p className="font-semibold mb-2">주간 인사이트</p>
          <p className="text-sm text-gray-600 mb-4">기분패턴 시각화 📊</p>
          <img src={illustrationChart} alt="주간 인사이트" className="w-20 h-20" />
        </div>
      </div>

      <button
        onClick={() => navigate("/intro3")}
        className="mt-12 px-8 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
      >
        다음
      </button>
    </div>
  );
};

export default Intro2;
