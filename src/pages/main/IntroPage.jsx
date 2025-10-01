// src/pages/main/IntroPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 배경 & 그래픽
import bgIntro from "../../assets/bg/vector-intro.svg";
import bgGradient from "../../assets/bg/bg-gradient-1.png";
import buttonGradient from "../../assets/bg/button-gradient.svg";

// 아이콘 / 일러스트
import emojiHappy from "../../assets/emoji/emoji-happy.svg";
import illustrationYoga from "../../assets/illustrations/illustration-yoga.svg";
import illustrationChart from "../../assets/illustrations/illustration-chart-weekly.svg";

import optionNeck from "../../assets/illustrations/option-neck.svg";
import optionSleep from "../../assets/illustrations/option-sleep.svg";
import optionStress from "../../assets/illustrations/option-stress.svg";
import optionHabit from "../../assets/illustrations/option-habit.svg";
import optionEnergy from "../../assets/illustrations/option-energy.svg";

// Intro 슬라이드 데이터
const slides = [
  {
    type: "hero",
    title: "Welcome to Emodia",
    description:
      "매일 여러분의 감정 기록을 기반으로 추천된 스트레칭 동작으로,\n몸과 마음을 풀어내어 삶의 질을 향상시킵니다",
    buttonText: "다음",
    bg: bgIntro,
  },
  {
    type: "cards",
    title: "Emodia로 매일 달라지는 3가지",
    items: [
      { title: "감정·몸상태 기록", desc: "하루 1분이면 충분해요 😊", img: emojiHappy },
      { title: "맞춤 루틴 제안", desc: "스트레칭 · 호흡 습관 🌿", img: illustrationYoga },
      { title: "주간 인사이트", desc: "기분패턴 시각화 📊", img: illustrationChart },
    ],
    buttonText: "다음",
    bg: bgGradient,
  },
  {
    type: "list",
    title: "Emodia로 매일 달라지는 3가지",
    items: [
      { title: "감정·몸상태 기록", desc: "매일의 감정을 간단하게 기록하고 나만의 패턴을 발견하세요", img: emojiHappy },
      { title: "맞춤 루틴 제안", desc: "감정에 맞는 스트레칭 자세로 몸과 마음의 균형을 찾으세요", img: illustrationYoga },
      { title: "주간 인사이트", desc: "시각화된 감정과 변화를 한눈에 파악하고 인사이트를 얻으세요", img: illustrationChart },
    ],
    buttonText: "다음",
    bg: bgGradient,
  },
  {
    type: "options",
    title: "지금 가장 바꾸고 싶은 한 가지는?",
    items: [
      { title: "목·어깨 뭉침 완화", img: optionNeck },
      { title: "수면의 질 개선", img: optionSleep },
      { title: "스트레스 관리", img: optionStress },
      { title: "꾸준한 기록 습관 만들기", img: optionHabit },
      { title: "에너지 회복", img: optionEnergy },
    ],
    helperText: "*선택에 따라 추천이 달라져요*",
    buttonText: "선택 완료",
    bg: bgGradient,
  },
  {
    type: "schedule",
    title: "루틴은 시간을 기억합니다",
    description: "매일 같은 시간에 부드럽게 시작해요",
    buttonText: "다음",
    bg: bgGradient,
  },
];

const IntroPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const slide = slides[currentIndex];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/main"); // 마지막 Intro 후 메인으로 이동
    }
  };

  // ✅ 버튼 컴포넌트 (공통)
  const GradientButton = ({ text, onClick }) => (
    <button
      onClick={onClick}
      className="relative px-8 py-3 rounded-full overflow-hidden text-white font-semibold shadow-lg hover:scale-105 transition"
    >
      <img
        src={buttonGradient}
        alt="button background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="relative z-10">{text}</span>
    </button>
  );

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src={slide.bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full h-full">
        {/* Hero 타입 */}
        {slide.type === "hero" && (
          <>
            <h1 className="text-5xl md:text-6xl font-bold italic text-white mb-6 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-white text-lg md:text-xl whitespace-pre-line max-w-2xl mb-12 drop-shadow">
              {slide.description}
            </p>
            <GradientButton text={slide.buttonText} onClick={handleNext} />
          </>
        )}

        {/* Cards 타입 */}
        {slide.type === "cards" && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold italic mb-12 text-gray-800 drop-shadow">
              {slide.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
              {slide.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur rounded-2xl p-6 flex flex-col items-center shadow-lg"
                >
                  <p className="font-semibold mb-2 text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                  <img src={item.img} alt={item.title} className="w-16 h-16" />
                </div>
              ))}
            </div>
            <div className="mt-12">
              <GradientButton text={slide.buttonText} onClick={handleNext} />
            </div>
          </>
        )}

        {/* List 타입 */}
        {slide.type === "list" && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold italic mb-12 text-gray-800">
              {slide.title}
            </h2>
            <div className="space-y-6 max-w-3xl w-full">
              {slide.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 bg-white/80 backdrop-blur rounded-xl p-4 shadow"
                >
                  <img src={item.img} alt={item.title} className="w-16 h-16" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <GradientButton text={slide.buttonText} onClick={handleNext} />
            </div>
          </>
        )}

        {/* Options 타입 */}
        {slide.type === "options" && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-800">{slide.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
              {slide.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur rounded-xl p-4 flex flex-col items-center shadow hover:scale-105 transition"
                >
                  <img src={item.img} alt={item.title} className="w-24 h-24 mb-3" />
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mb-8">{slide.helperText}</p>
            <GradientButton text={slide.buttonText} onClick={handleNext} />
          </>
        )}

        {/* Schedule 타입 */}
        {slide.type === "schedule" && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{slide.title}</h2>
            <p className="text-gray-600 mb-12">{slide.description}</p>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-8 max-w-lg w-full mb-12 shadow">
              <div className="flex justify-center gap-2 mb-6">
                {["06:30", "07:00", "08:30", "09:00"].map((t) => (
                  <button
                    key={t}
                    className={`px-4 py-2 rounded-full text-sm ${
                      t === "08:30"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="text-3xl font-bold text-center">08 : 30 PM</div>
            </div>
            <div className="flex gap-4">
              {/* 회색 버튼 그대로 */}
              <button className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition">
                나중에 설정
              </button>
              <GradientButton text={slide.buttonText} onClick={handleNext} />
            </div>
          </>
        )}

        {/* Progress Dots */}
        <div className="flex gap-2 mt-10">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-purple-600 w-6" : "bg-gray-300 w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
