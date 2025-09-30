// src/pages/intro/Intro4.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// 선택지 일러스트 (피그마 추출된 파일)
import optionNeck from "../../assets/illustrations/option-neck.svg";
import optionSleep from "../../assets/illustrations/option-sleep.svg";
import optionStress from "../../assets/illustrations/option-stress.svg";
import optionHabit from "../../assets/illustrations/option-habit.svg";
import optionEnergy from "../../assets/illustrations/option-energy.svg";

const Intro4 = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        지금 가장 바꾸고 싶은 한 가지는?
      </h2>

      {/* 5개 선택지 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
          <img src={optionNeck} alt="목 어깨 뭉침 완화" className="w-24 h-24 mb-3" />
          <p className="text-sm font-medium">목·어깨 뭉침 완화</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
          <img src={optionSleep} alt="수면의 질 개선" className="w-24 h-24 mb-3" />
          <p className="text-sm font-medium">수면의 질 개선</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
          <img src={optionStress} alt="스트레스 관리" className="w-24 h-24 mb-3" />
          <p className="text-sm font-medium">스트레스 관리</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
          <img src={optionHabit} alt="기록 습관 만들기" className="w-24 h-24 mb-3" />
          <p className="text-sm font-medium">꾸준한 기록 습관 만들기</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
          <img src={optionEnergy} alt="에너지 회복" className="w-24 h-24 mb-3" />
          <p className="text-sm font-medium">에너지 회복</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-8">
        *선택에 따라 추천이 달라져요*
      </p>

      <button
        onClick={() => navigate("/intro5")}
        className="px-8 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
      >
        선택 완료
      </button>
    </div>
  );
};

export default Intro4;
