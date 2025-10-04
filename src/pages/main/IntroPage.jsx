// src/pages/main/IntroPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../api/ProfileAPI";

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

// 타임 피커 휠 컴포넌트
const TimeWheel = ({ list, selected, setSelected }) => {
  const containerRef = React.useRef(null);
  const ITEM_HEIGHT = 50;
  const selectedIndex = list.indexOf(selected);

  // 무한 스크롤을 위해 리스트를 3번 복제
  const infiniteList = [...list, ...list, ...list];

  // 선택값 변경 시 스크롤 위치 업데이트
  React.useEffect(() => {
    if (containerRef.current) {
      const targetScroll = (list.length + selectedIndex) * ITEM_HEIGHT;
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });
    }
  }, [selected, list.length, selectedIndex, ITEM_HEIGHT]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const newIndex = (selectedIndex + delta + list.length) % list.length;
    setSelected(list[newIndex]);
  };

  return (
    <div className="relative w-24">
      {/* 선택 영역 하이라이트 */}
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-12 bg-purple-50/30 border-y-2 border-purple-300 pointer-events-none z-0"></div>

      {/* 위쪽 그라디언트 */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>

      {/* 아래쪽 그라디언트 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

      <div
        ref={containerRef}
        className="h-60 overflow-y-scroll relative z-20"
        onWheel={handleWheel}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style>{`
          .overflow-y-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* 상단 패딩 */}
        <div style={{ height: `${ITEM_HEIGHT * 2}px` }}></div>

        {infiniteList.map((item, idx) => {
          // 중간 섹션(두 번째 복제본) 기준으로 계산
          const centerIndex = list.length + selectedIndex;
          const distance = Math.abs(idx - centerIndex);
          const isSelected = idx === centerIndex;

          return (
            <div
              key={`${item}-${idx}`}
              className={`flex items-center justify-center select-none transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "text-4xl font-black text-purple-600"
                  : distance === 1
                  ? "text-2xl font-bold text-gray-600"
                  : distance === 2
                  ? "text-xl font-semibold text-gray-400"
                  : "text-lg text-gray-300"
              }`}
              style={{
                height: `${ITEM_HEIGHT}px`,
                opacity: distance > 2 ? 0.3 : 1
              }}
              onClick={() => {
                const actualIndex = idx % list.length;
                setSelected(list[actualIndex]);
              }}
            >
              {item.toString().padStart(2, "0")}
            </div>
          );
        })}

        {/* 하단 패딩 */}
        <div style={{ height: `${ITEM_HEIGHT * 2}px` }}></div>
      </div>
    </div>
  );
};

const IntroPage = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedDays, setSelectedDays] = useState(["월", "화", "수", "목", "금", "토", "일"]);
  const [weeklyAlarm, setWeeklyAlarm] = useState(false);

  const navigate = useNavigate();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // 목표 옵션 매핑
  const goalOptions = [
    { title: "목·어깨 뭉침 완화", value: "relax" },
    { title: "수면의 질 개선", value: "sleep" },
    { title: "스트레스 관리", value: "stress" },
    { title: "꾸준한 기록 습관 만들기", value: "habit" },
    { title: "에너지 회복", value: "energy" },
  ];

  const handleNext = async () => {
    if (step === 5) {
      // 마지막 단계에서 프로필 저장
      try {
        const timeString = `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}:00`;

        // 토큰 확인
        const token = localStorage.getItem("access");
        if (!token) {
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
          return;
        }

        const profileData = {
          main_goal: selectedOption !== null ? goalOptions[selectedOption].value : null,
          routine_time: timeString,
          routine_days: selectedDays,
        };

        console.log("저장할 프로필 데이터:", profileData);
        const result = await updateProfile(profileData);
        console.log("저장 결과:", result);

        alert("설정이 저장되었습니다!");
        navigate("/main");
      } catch (error) {
        console.error("프로필 저장 실패:", error);

        // 401 에러인 경우 로그인 페이지로 이동
        if (error.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/login");
        } else {
          alert("설정 저장에 실패했습니다. 다시 시도해주세요.");
        }
      }
    } else if (step < 5) {
      setStep(step + 1);
    }
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
                  { title: "목·어깨 뭉침 완화", img: optionNeck, value: "relax" },
                  { title: "수면의 질 개선", img: optionSleep, value: "sleep" },
                  { title: "스트레스 관리", img: optionStress, value: "stress" },
                  { title: "꾸준한 기록 습관 만들기", img: optionHabit, value: "habit" },
                  { title: "에너지 회복", img: optionEnergy, value: "energy" },
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
                {["07:00", "12:30", "19:30", "22:00"].map((t) => {
                  const [h, m] = t.split(":").map(Number);
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        setSelectedHour(h);
                        setSelectedMinute(m);
                      }}
                      className={`px-4 py-1 rounded-full text-sm font-medium relative ${
                        selectedHour === h && selectedMinute === m
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                      style={{
                        backgroundImage:
                          selectedHour === h && selectedMinute === m
                            ? `url(${recommendTimeGradient})`
                            : "none",
                        backgroundColor:
                          selectedHour === h && selectedMinute === m
                            ? "transparent"
                            : "#f3f4f6",
                        backgroundSize: "cover",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              {/* 커스텀 타임 피커 */}
              <div className="bg-white rounded-2xl p-8 max-w-lg w-full mb-12 shadow flex flex-col items-center">
                <div className="flex justify-center gap-6 items-center mb-6">
                  <TimeWheel key={`hour-${selectedHour}`} list={hours} selected={selectedHour} setSelected={setSelectedHour} />
                  <span className="text-4xl font-bold text-gray-800">:</span>
                  <TimeWheel key={`minute-${selectedMinute}`} list={minutes} selected={selectedMinute} setSelected={setSelectedMinute} />
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
                      onChange={() => {
                        const newWeeklyAlarm = !weeklyAlarm;
                        setWeeklyAlarm(newWeeklyAlarm);

                        if (newWeeklyAlarm) {
                          // 주말 쉬기 활성화: 토, 일 제거
                          setSelectedDays(prev => prev.filter(day => day !== "토" && day !== "일"));
                        } else {
                          // 주말 쉬기 비활성화: 토, 일 추가
                          setSelectedDays(prev => {
                            const newDays = [...prev];
                            if (!newDays.includes("토")) newDays.push("토");
                            if (!newDays.includes("일")) newDays.push("일");
                            return newDays;
                          });
                        }
                      }}
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
                <GradientButton text="완료" onClick={handleNext} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IntroPage;
