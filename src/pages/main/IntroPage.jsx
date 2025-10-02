// src/pages/main/IntroPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
      {
        title: "감정·몸상태 기록",
        desc: "매일의 감정을 간단하게 기록하고 나만의 패턴을 발견하세요",
        img: emojiHappy,
      },
      {
        title: "맞춤 루틴 제안",
        desc: "감정에 맞는 스트레칭 자세로 몸과 마음의 균형을 찾으세요",
        img: illustrationYoga,
      },
      {
        title: "주간 인사이트",
        desc: "시각화된 감정과 변화를 한눈에 파악하고 인사이트를 얻으세요",
        img: illustrationChart,
      },
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTime, setSelectedTime] = useState("08:30 AM");
  const [selectedDays, setSelectedDays] = useState([]);
  const [weeklyAlarm, setWeeklyAlarm] = useState(false);

  const navigate = useNavigate();
  const slide = slides[currentIndex];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/"); // 마지막 Intro 후 메인 이동
    }
  };

  // 공통 Gradient 버튼
  const GradientButton = ({ text, onClick, disabled }) => (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-3 rounded-full overflow-hidden font-semibold shadow-lg transition
        ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-white hover:scale-105"}`}
    >
      {!disabled && (
        <img src={buttonGradient} alt="button background" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <span className="relative z-10">{text}</span>
    </motion.button>
  );

  // 슬라이드 애니메이션
  const slideVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  // 시간 변경 함수
  const updateTime = (type, direction) => {
    const [h, m, ap] = selectedTime.split(/[: ]/);
    let hour = parseInt(h, 10);
    let min = parseInt(m, 10);

    if (type === "hour") {
      if (direction === "up") hour = hour === 12 ? 1 : hour + 1;
      else hour = hour === 1 ? 12 : hour - 1;
    }
    if (type === "minute") {
      if (direction === "up") min = (min + 1) % 60;
      else min = (min - 1 + 60) % 60;
    }

    setSelectedTime(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")} ${ap}`);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <img src={slide.bg} alt="background" className="absolute inset-0 w-full h-full object-cover" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full h-full"
        >
          {/* Hero */}
          {slide.type === "hero" && (
            <>
              <motion.h1 className="text-5xl md:text-6xl font-bold italic text-white mb-6" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                {slide.title}
              </motion.h1>
              <p className="text-white text-lg md:text-xl whitespace-pre-line max-w-2xl mb-12">{slide.description}</p>
              <GradientButton text={slide.buttonText} onClick={handleNext} />
            </>
          )}

          {/* Cards */}
          {slide.type === "cards" && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold italic mb-12 text-gray-800">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                {slide.items.map((item, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white/90 rounded-2xl p-6 flex flex-col items-center shadow-lg">
                    <p className="font-semibold mb-2 text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                    <img src={item.img} alt={item.title} className="w-16 h-16" />
                  </motion.div>
                ))}
              </div>
              <div className="mt-12"><GradientButton text={slide.buttonText} onClick={handleNext} /></div>
            </>
          )}

          {/* List */}
          {slide.type === "list" && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold italic mb-12 text-gray-800">{slide.title}</h2>
              <div className="space-y-6 max-w-3xl w-full">
                {slide.items.map((item, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.02 }} className="flex items-center gap-6 bg-white/80 rounded-xl p-4 shadow">
                    <img src={item.img} alt={item.title} className="w-16 h-16" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12"><GradientButton text={slide.buttonText} onClick={handleNext} /></div>
            </>
          )}

          {/* Options */}
          {slide.type === "options" && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-800">{slide.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
                {slide.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-pointer bg-white/80 rounded-xl p-4 flex flex-col items-center shadow transition 
                      ${selectedOption === idx ? "ring-4 ring-purple-400 scale-105" : ""}`}
                  >
                    <img src={item.img} alt={item.title} className="w-24 h-24 mb-3" />
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mb-8">{slide.helperText}</p>
              <GradientButton text={slide.buttonText} onClick={handleNext} disabled={selectedOption === null} />
            </>
          )}

          {/* Schedule */}
          {slide.type === "schedule" && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{slide.title}</h2>
              <p className="text-gray-600 mb-12">{slide.description}</p>

              {/* 커스텀 타임 피커 */}
              <div className="bg-white/90 rounded-2xl p-8 max-w-lg w-full mb-12 shadow flex flex-col items-center">
                <div className="flex justify-center gap-6 items-center mb-6">
                  {/* 시 */}
                  <div className="flex flex-col items-center" onWheel={(e) => updateTime("hour", e.deltaY < 0 ? "up" : "down")}>
                    <button onClick={() => updateTime("hour", "up")}>▲</button>
                    <div className="text-5xl font-bold text-gray-800">{selectedTime.split(":")[0]}</div>
                    <button onClick={() => updateTime("hour", "down")}>▼</button>
                  </div>

                  <span className="text-5xl font-bold text-gray-800">:</span>

                  {/* 분 */}
                  <div className="flex flex-col items-center" onWheel={(e) => updateTime("minute", e.deltaY < 0 ? "up" : "down")}>
                    <button onClick={() => updateTime("minute", "up")}>▲</button>
                    <div className="text-5xl font-bold text-gray-800">{selectedTime.split(":")[1].split(" ")[0]}</div>
                    <button onClick={() => updateTime("minute", "down")}>▼</button>
                  </div>

                  {/* AM/PM */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        const [h, m, ap] = selectedTime.split(/[: ]/);
                        setSelectedTime(`${h}:${m} ${ap === "AM" ? "PM" : "AM"}`);
                      }}
                      className="px-3 py-1 rounded-full bg-purple-500 text-white font-semibold"
                    >
                      {selectedTime.split(" ")[1]}
                    </button>
                  </div>
                </div>

                {/* 요일 선택 */}
                <div className="flex justify-center gap-2 mb-6">
                  {["월", "화", "수", "목", "금", "토", "일"].map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setSelectedDays((prev) =>
                          prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedDays.includes(day)
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* 주간 알림 토글 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">주간 알림</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={weeklyAlarm}
                      onChange={() => setWeeklyAlarm(!weeklyAlarm)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition ${weeklyAlarm ? "bg-purple-500" : "bg-gray-300"}`}>
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          weeklyAlarm ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
                >
                  나중에 설정
                </button>
                <GradientButton
                  text={slide.buttonText}
                  onClick={handleNext}
                  disabled={!selectedTime || selectedDays.length === 0}
                />
              </div>
            </>
          )}

          {/* Progress Dots */}
          <div className="flex gap-2 mt-10">
            {slides.map((_, idx) => (
              <motion.div
                key={idx}
                animate={{ width: idx === currentIndex ? 24 : 12 }}
                className={`h-3 rounded-full transition-all ${idx === currentIndex ? "bg-purple-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IntroPage;
