// src/pages/intro/Intro3.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import emojiHappy from "../../assets/emoji/emoji-happy.svg";
import illustrationYoga from "../../assets/illustrations/illustration-yoga.svg";
import illustrationChart from "../../assets/illustrations/illustration-chart-weekly.svg";

const Intro3 = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-2xl md:text-3xl font-bold italic mb-12 text-center">
        <span className="italic">Emodia</span>로 매일 달라지는 3가지
      </h2>

      {/* 리스트 3개 */}
      <div className="space-y-8 max-w-3xl w-full">
        <div className="flex items-center gap-6 bg-purple-50 rounded-xl p-4">
          <img src={emojiHappy} alt="감정 기록" className="w-12 h-12" />
          <div>
            <p className="font-semibold">감정·몸상태 기록</p>
            <p className="text-gray-600 text-sm">
              매일의 감정을 간단하게 기록하고 나만의 패턴을 발견하세요
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-purple-50 rounded-xl p-4">
          <img src={illustrationYoga} alt="루틴 제안" className="w-16 h-16" />
          <div>
            <p className="font-semibold">맞춤 루틴 제안</p>
            <p className="text-gray-600 text-sm">
              감정에 맞는 스트레칭 자세로 몸과 마음의 균형을 찾으세요
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-purple-50 rounded-xl p-4">
          <img src={illustrationChart} alt="주간 인사이트" className="w-16 h-16" />
          <div>
            <p className="font-semibold">주간 인사이트</p>
            <p className="text-gray-600 text-sm">
              시각화된 감정과 변화를 한눈에 파악하고 인사이트를 얻으세요
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/intro4")}
        className="mt-12 px-8 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
      >
        다음
      </button>
    </div>
  );
};

export default Intro3;
