// src/pages/intro/Intro1.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Intro1 = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200 text-center">
      <h1 className="text-5xl md:text-6xl font-bold italic text-white mb-6">
        Welcome to Emodia
      </h1>
      <p className="text-white text-lg md:text-xl max-w-2xl mb-12">
        매일 여러분의 감정 기록을 기반으로 추천된 스트레칭 동작으로,
        <br />
        몸과 마음을 풀어내어 삶의 질을 향상시킵니다
      </p>
      <button
        onClick={() => navigate("/intro2")}
        className="px-8 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
      >
        다음
      </button>
    </div>
  );
};

export default Intro1;
