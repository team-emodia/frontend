// src/pages/main/IntroPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 배경 & 그래픽
import bgHero from "../../assets/bg/intro-hero.png";
import progressBar from "../../assets/bg/progress-bar.svg";
import buttonGradient from "../../assets/bg/button-gradient.svg";
import recommendTimeGradient from "../../assets/bg/recommend-time-gradient.svg";

// 일러스트
import illustrationYoga from "../../assets/illustrations/illustration-yoga.svg";
import illustrationChart from "../../assets/illustrations/illustration-chart-weekly.svg";
import illustrationHabit from "../../assets/illustrations/illustration-habit.svg";

// 옵션
import optionNeck from "../../assets/illustrations/option-neck.svg";
import optionSleep from "../../assets/illustrations/option-sleep.svg";
import optionStress from "../../assets/illustrations/option-stress.svg";
import optionHabit from "../../assets/illustrations/option-habit.svg";
import optionEnergy from "../../assets/illustrations/option-energy.svg";

const IntroPage = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [ampm, setAmpm] = useState("AM");
  const [selectedDays, setSelectedDays] = useState([]);
  const [weeklyAlarm, setWeeklyAlarm] = useState(false);

  const navigate = useNavigate();

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else navigate("/main");
  };
  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const GradientButton = ({ text, onClick, disabled }) => (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-3 rounded-full overflow-hidden font-semibold shadow-lg transition
        ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-white hover:scale-105"}`}
    >
      {!disabled && (
        <img
          src={buttonGradient}
          alt="button background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <span className="relative z-10">{text}</span>
    </motion.button>
  );

  // 애니메이션
  const slideVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  // 타임 피커 (스크롤형)
  const renderWheel = (list, selected, setSelected) => (
    <div className="h-40 overflow-hidden relative w-16">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ height: "200%", overflow: "hidden" }}
        onWheel={(e) => {
          e.preventDefault();
          if (e.deltaY > 0) {
            const idx = list.indexOf(selected);
            setSelected(list[(idx + 1) % list.length]);
          } else {
            const idx = list.indexOf(selected);
            setSelected(list[(idx - 1 + list.length) % list.length]);
          }
        }}
      >
        {list.map((item) => (
          <div
            key={item}
            onClick={() => setSelected(item)}
            className={`text-center py-1 cursor-pointer ${
              item === selected
                ? "text-4xl font-bold text-black"
                : "text-lg text-gray-400"
            }`}
          >
            {item.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 */}
      {step === 1 ? (
        <img
          src={bgHero}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-white"></div>
      )}

      {/* 상단 ProgressBar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3/4">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 flex flex-col items-center text-center px-6 w-full h-full justify-center"
        >
          {/* Step 1 : Hero */}
          {step === 1 && (
            <>
              <h1 className="text-5xl md:text-6xl font-bold italic text-white mb-6">
                Welcome to Emodia
              </h1>
              <p className="text-white text-lg md:text-xl whitespace-pre-line max-w-2xl mb-12">
                매일 여러분의 감정 기록을 기반으로 추천된 스트레칭 동작으로,
                {"\n"}몸과 마음을 풀어내어 삶의 질을 향상시킵니다
              </p>
              <GradientButton text="다음" onClick={handleNext} />
            </>
          )}

          {/* Step 2 : 카드형 */}
          {step === 2 && (
            <>
              <h2 className="text-3xl font-bold italic mb-12 text-gray-800">
                Emodia로 매일 달라지는 3가지
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg">
                  <img
                    src={illustrationHabit}
                    alt="habit"
                    className="w-20 h-20 mb-4"
                  />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    감정·몸상태 기록
                  </h3>
                  <p className="text-sm text-gray-600">
                    하루 1분이면 충분해요 😊
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg">
                  <img
                    src={illustrationYoga}
                    alt="yoga"
                    className="w-20 h-20 mb-4"
                  />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    맞춤 루틴 제안
                  </h3>
                  <p className="text-sm text-gray-600">스트레칭 · 호흡 습관 🌿</p>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg">
                  <img
                    src={illustrationChart}
                    alt="chart"
                    className="w-20 h-20 mb-4"
                  />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    주간 인사이트
                  </h3>
                  <p className="text-sm text-gray-600">기분패턴 시각화 📊</p>
                </div>
              </div>
              <div className="mt-12 flex gap-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
                >
                  이전
                </button>
                <GradientButton text="다음" onClick={handleNext} />
              </div>
            </>
          )}

          {/* Step 3 : 리스트형 */}
          {step === 3 && (
            <>
              <h2 className="text-3xl font-bold mb-12 text-gray-800">
                Emodia로 매일 달라지는 3가지
              </h2>
              <div className="space-y-6 max-w-3xl w-full">
                <div className="flex items-center gap-6 bg-white rounded-xl p-4 shadow">
                  <img
                    src={illustrationHabit}
                    alt="habit"
                    className="w-16 h-16"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">감정·몸상태 기록</p>
                    <p className="text-gray-600 text-sm">
                      매일의 감정을 간단하게 기록하고 나만의 패턴을 발견하세요
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-white rounded-xl p-4 shadow">
                  <img
                    src={illustrationYoga}
                    alt="yoga"
                    className="w-16 h-16"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">맞춤 루틴 제안</p>
                    <p className="text-gray-600 text-sm">
                      감정에 맞는 스트레칭 자세로 몸과 마음의 균형을 찾으세요
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-white rounded-xl p-4 shadow">
                  <img
                    src={illustrationChart}
                    alt="chart"
                    className="w-16 h-16"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">주간 인사이트</p>
                    <p className="text-gray-600 text-sm">
                      시각화된 감정과 변화를 한눈에 파악하고 인사이트를 얻으세요
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex gap-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
                >
                  이전
                </button>
                <GradientButton text="다음" onClick={handleNext} />
              </div>
            </>
          )}

          {/* Step 4 : 옵션 선택 */}
          {step === 4 && (
            <>
              <h2 className="text-3xl font-bold mb-12 text-gray-800">
                지금 가장 바꾸고 싶은 한 가지는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
                {[
                  { title: "목·어깨 뭉침 완화", img: optionNeck },
                  { title: "수면의 질 개선", img: optionSleep },
                  { title: "스트레스 관리", img: optionStress },
                  { title: "꾸준한 기록 습관 만들기", img: optionHabit },
                  { title: "에너지 회복", img: optionEnergy },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`cursor-pointer bg-white rounded-xl p-6 flex flex-col items-center shadow transition 
                      ${
                        selectedOption === idx
                          ? "ring-4 ring-purple-400 scale-105"
                          : ""
                      }`}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 mb-3"
                    />
                    <p className="text-sm font-medium text-gray-800">
                      {item.title}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mb-8">
                *선택에 따라 추천이 달라져요*
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
                >
                  이전
                </button>
                <GradientButton
                  text="선택 완료"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                />
              </div>
            </>
          )}

          {/* Step 5 : 스케줄 */}
          {step === 5 && (
            <>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                루틴은 시간을 기억합니다
              </h2>
              <p className="text-gray-600 mb-8">
                매일 같은 시간에 부드럽게 시작해요
              </p>

              {/* 추천 시간 */}
              <div className="flex gap-3 mb-6">
                {["06:30", "07:00", "08:30", "09:00"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedHour(parseInt(t.split(":")[0]))}
                    className={`px-4 py-1 rounded-full text-sm font-medium relative ${
                      `${selectedHour}:${selectedMinute}`.startsWith(t)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                    style={{
                      backgroundImage:
                        `${selectedHour}:${selectedMinute}`.startsWith(t)
                          ? `url(${recommendTimeGradient})`
                          : "none",
                      backgroundColor: `${selectedHour}:${selectedMinute}`.startsWith(
                        t
                      )
                        ? "transparent"
                        : "#f3f4f6",
                      backgroundSize: "cover",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* 커스텀 타임 피커 */}
              <div className="bg-white rounded-2xl p-8 max-w-lg w-full mb-12 shadow flex flex-col items-center">
                <div className="flex justify-center gap-6 items-center mb-6">
                  {renderWheel(hours, selectedHour, setSelectedHour)}
                  <span className="text-4xl font-bold text-gray-800">:</span>
                  {renderWheel(minutes, selectedMinute, setSelectedMinute)}

                  <div className="flex flex-col space-y-2 ml-4">
                    {["AM", "PM"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setAmpm(m)}
                        className={`px-4 py-1 rounded-full text-sm font-bold ${
                          ampm === m
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 요일 선택 */}
                <div className="flex justify-center gap-2 mb-6">
                  {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDays((prev) =>
                          prev.includes(day)
                            ? prev.filter((d) => d !== day)
                            : [...prev, day]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedDays.includes(day)
                          ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* 주간 알림 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    주말엔 쉬기
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={weeklyAlarm}
                      onChange={() => setWeeklyAlarm(!weeklyAlarm)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition ${
                        weeklyAlarm ? "bg-purple-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          weeklyAlarm ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
                >
                  이전
                </button>
                  <button
                      onClick={() => navigate("/"
                      )}
                      className="px-6 py-3
                      rounded-full bg-red-500 text-white
                       font-semibold hover:bg-red-600
                       transition"
                      >
                      나중에 설정
                  </button>
                          <GradientButton text="다음" onClick={handleNext} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IntroPage;
