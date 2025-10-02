import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 배경 & 버튼 이미지
import chartGradient from "../../assets/bg/chart-gradient.svg";
import chartLine from "../../assets/bg/chart-line.svg";
import buttonGradient from "../../assets/bg/button-gradient.svg";
import exercise1 from "../../assets/bg/exercise-bg-1.svg";
import exercise2 from "../../assets/bg/exercise-bg-2.svg";
import exercise3 from "../../assets/bg/exercise-bg-3.svg";
import timelineDot from "../../assets/bg/timeline-dot.svg";

// ✅ Stats와 연동된 컴포넌트 import
import WeeklyMoodChart from "../../components/WeeklyMoodChart";

function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  // ✅ 추가된 상태
  const [selectedEmotion, setSelectedEmotion] = useState(null); // 현재 모달에서 선택된 감정
  const [calendarRecords, setCalendarRecords] = useState({});   // 날짜별 저장된 감정

  const emotions = [
    { symbol: "😀", label: "행복" },
    { symbol: "😍", label: "설렘" },
    { symbol: "😌", label: "차분" },
    { symbol: "😐", label: "보통" },
    { symbol: "😡", label: "분노" },
    { symbol: "😨", label: "불안" },
    { symbol: "🥱", label: "지침" },
    { symbol: "😢", label: "우울" },
  ];

  const toggleExercise = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  // ✅ 저장 버튼 동작: 감정 기록 반영
  const handleSaveRecord = () => {
    if (selectedDay && selectedEmotion) {
      setCalendarRecords({
        ...calendarRecords,
        [selectedDay]: selectedEmotion,
      });
    }
    setShowNewRecord(false);
    setShowDetail(true);
  };

  // 공통 모달
  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-8 w-[1200px] max-h-[90vh] overflow-y-auto relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-w-[1440px] min-h-screen bg-white font-sans">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-12 py-6 border-b">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full"></span>
          <span className="text-xl font-bold">Emodia</span>
        </div>
        <nav className="flex gap-10 text-gray-600 text-base font-medium">
          <a href="/about">About</a>
          <a href="/calendar" className="font-semibold text-black">
            Calendar
          </a>
          <a href="/workout">Workout</a>
          <a href="/stats">Stats</a>
        </nav>
        <button
          className="px-6 py-2 text-sm text-white rounded-full shadow-md"
          style={{
            backgroundImage: `url(${buttonGradient})`,
            backgroundSize: "cover",
          }}
        >
          Get started
        </button>
      </header>

      {/* 본문 */}
      <main className="flex px-12 py-10 gap-12">
        {/* 좌측 패널 */}
        <section className="w-[320px] space-y-6">
          {/* Today overview */}
          <div className="p-6 border rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">✨ Today overview</p>
            <div className="flex items-center mt-4 gap-3">
              <img src={chartGradient} alt="Mood" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-xs text-gray-500">Mood</p>
                <p className="text-sm font-semibold">
                  차분 <span className="text-green-600">+12%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Weekly mood (Stats 연동) */}
          <div className="p-6 border rounded-2xl shadow-sm">
            <p className="font-bold text-sm">Weekly mood</p>
            <div className="mt-4">
              {/* ✅ StatsPage와 같은 WeeklyMoodChart 삽입 */}
              <WeeklyMoodChart />
            </div>
          </div>
          {/* Today's habits */}
          <div className="p-6 border rounded-2xl shadow-sm space-y-2">
            <p className="font-bold text-sm">Today's habits</p>
            <label className="flex gap-2 text-sm"><input type="checkbox" /> 물 6잔</label>
            <label className="flex gap-2 text-sm"><input type="checkbox" /> 스트레칭 10분</label>
            <label className="flex gap-2 text-sm"><input type="checkbox" /> 저녁 산책</label>
          </div>
          {/* Quick add */}
          <div className="p-6 border rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">+ Quick add</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 border rounded-full text-xs">감정 기록</button>
              <button className="px-3 py-1 border rounded-full text-xs">운동 추가</button>
              <button className="px-3 py-1 border rounded-full text-xs">메모/태그</button>
            </div>
          </div>
          {/* Reminders */}
          <div className="p-6 border rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">🔔 Reminders</p>
            <p className="text-xs mt-2">오전 8:30 감정 기록 알림</p>
            <p className="text-xs">저녁 9:00 스트레칭 루틴</p>
          </div>
        </section>

        {/* 달력 */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-6">2025년 09월</h1>
          <div className="grid grid-cols-7 gap-3">
            {[...Array(30)].map((_, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDay(i + 1); setShowDetail(true); }}
                className="h-20 border rounded-xl flex flex-col items-center justify-center text-sm hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 active:scale-95"
              >
                <span>{i + 1}</span>
                {/* ✅ 날짜에 저장된 감정 표시 */}
                {calendarRecords[i + 1] && (
                  <span className="text-xl mt-1">{calendarRecords[i + 1]}</span>
                )}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* 상세보기 모달 */}
      {showDetail && (
        <Modal onClose={() => setShowDetail(false)}>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold">2025년 09월 {selectedDay}일 (금)</h1>
            <div className="flex gap-3">
              <button onClick={() => setShowDetail(false)} className="px-5 py-2 border rounded-full text-sm">달력으로</button>
              <button
                onClick={() => { setShowDetail(false); setShowNewRecord(true); }}
                className="px-5 py-2 text-white rounded-full text-sm shadow-md"
                style={{ backgroundImage: `url(${buttonGradient})`, backgroundSize: "cover" }}
              >
                새 기록 추가
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* 오늘 요약 */}
            <section className="col-span-4 p-6 border rounded-2xl space-y-4 shadow-sm">
              <p className="text-sm text-gray-500">오늘 요약</p>
              <p className="text-base font-semibold">Mood · 차분</p>
              <p className="text-sm">메모: 저녁 스트레칭 후 기분이 나아짐</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 border rounded-full text-xs">업무</span>
                <span className="px-3 py-1 border rounded-full text-xs">수면</span>
                <span className="px-3 py-1 border rounded-full text-xs">스트레칭</span>
              </div>
              <p className="text-sm">수면 <span className="font-bold">6.5h</span> · 물 섭취 <span className="font-bold">1.8L</span></p>
            </section>

            {/* 감정 타임라인 */}
            <section className="col-span-4 p-6 border rounded-2xl shadow-sm">
              <p className="font-bold mb-6 text-sm">감정 타임라인</p>
              <ul className="space-y-6 text-sm">
                {[["08:10","불안","아침 준비"],["13:20","보통","팀 미팅"],["18:40","차분","산책 20분"],["21:30","만족","스트레칭 후 가벼움"]].map(([time, mood, desc], i) => (
                  <li key={i} className="flex items-center gap-3">
                    <img src={timelineDot} alt="dot" className="w-4 h-4" />
                    <span>{time} · {mood} · {desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 오늘의 운동 */}
            <section className="col-span-4 p-6 border rounded-2xl space-y-4 shadow-sm">
              <p className="font-bold text-sm">오늘의 운동</p>
              <div className="space-y-3">
                <img src={exercise1} alt="운동1" className="rounded-xl" />
                <img src={exercise2} alt="운동2" className="rounded-xl" />
                <img src={exercise3} alt="운동3" className="rounded-xl" />
              </div>
            </section>
          </div>

          {/* 인사이트 */}
          <div className="flex gap-4 mt-8 text-xs text-gray-600">
            <span className="px-3 py-1 border rounded-full">저녁 운동 이후 긍정감 ↑</span>
            <span className="px-3 py-1 border rounded-full">수면 6.5h — 평소 대비 -0.5h</span>
            <span className="px-3 py-1 border rounded-full">업무 스트레스 태그 2회</span>
          </div>
        </Modal>
      )}

      {/* 새 기록 모달 */}
      {showNewRecord && (
        <Modal onClose={() => setShowNewRecord(false)}>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold">새 기록 추가</h1>
            <button
              onClick={() => { setShowNewRecord(false); setShowDetail(true); }}
              className="px-5 py-2 border rounded-full text-sm"
            >
              ← 날짜로 돌아가기
            </button>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* 기본 정보 */}
            <section className="col-span-6 p-6 border rounded-2xl space-y-6 shadow-sm">
              <p className="font-bold text-sm">기본 정보</p>
              <div className="flex gap-3 items-center">
                <input type="time" defaultValue="20:30" className="border px-4 py-2 rounded-lg text-sm w-32" />
                <button className="px-3 py-1 text-xs border rounded-lg">알림 설정 안 함</button>
                <button className="px-3 py-1 text-xs border rounded-lg">오늘(9/26)</button>
              </div>

              {/* 감정 */}
              <div>
                <p className="font-bold text-sm mb-3">감정</p>
                <div className="grid grid-cols-4 gap-4">
                  {emotions.map((emoji, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedEmotion(emoji.symbol)}
                      className={`flex flex-col items-center space-y-1 px-3 py-2 border rounded-lg transition-transform ${
                        selectedEmotion === emoji.symbol
                          ? "border-blue-500 bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl">{emoji.symbol}</span>
                      <span className="text-xs">{emoji.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <textarea className="border w-full h-24 rounded-lg p-3 text-sm" placeholder="오늘 무슨 일이 있었나요?" />
              {/* 태그 */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 border rounded-full text-xs">업무</span>
                <span className="px-3 py-1 border rounded-full text-xs">수면</span>
                <span className="px-3 py-1 border rounded-full text-xs">스트레칭</span>
                <span className="px-3 py-1 border rounded-full text-xs">컨디션</span>
              </div>
              {/* 지표 */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">수면</p>
                  <p className="font-bold">0.0h</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">물 섭취</p>
                  <p className="font-bold">0.0L</p>
                </div>
              </div>
            </section>

            {/* 운동 */}
            <section className="col-span-6 p-6 border rounded-2xl space-y-6 shadow-sm">
              <p className="font-bold text-sm">운동 추가 (선택)</p>
              <div className="flex gap-2">
                <input type="text" placeholder="예: 요가, 스트레칭" className="flex-1 border px-3 py-2 rounded-lg text-sm" />
                <button className="px-4 py-2 text-white rounded-lg shadow-md" style={{ backgroundImage: `url(${buttonGradient})`, backgroundSize: "cover" }}>
                  검색
                </button>
              </div>
              <div className="flex gap-4">
                <div className="p-2 border rounded-lg text-center">
                  <img src={exercise1} alt="운동1" className="rounded-xl w-32 h-20" />
                  <p className="text-xs mt-1">목·어깨 릴리즈</p>
                  <button onClick={() => toggleExercise("목·어깨 릴리즈")} className="px-2 py-1 text-xs border rounded-lg mt-1">+</button>
                </div>
                <div className="p-2 border rounded-lg text-center">
                  <img src={exercise2} alt="운동2" className="rounded-xl w-32 h-20" />
                  <p className="text-xs mt-1">4-7-8 호흡</p>
                  <button onClick={() => toggleExercise("4-7-8 호흡")} className="px-2 py-1 text-xs border rounded-lg mt-1">+</button>
                </div>
              </div>
              {/* 선택된 운동 표시 */}
              <div className="mt-4">
                <p className="text-sm font-bold mb-2">선택됨</p>
                {selectedExercises.length > 0 ? (
                  <ul className="space-y-1 text-xs">
                    {selectedExercises.map((ex, i) => (
                      <li key={i} className="px-3 py-1 border rounded-lg inline-block mr-2">{ex}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500">아직 선택된 운동이 없어요</p>
                )}
              </div>
            </section>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-4 mt-10">
            <button className="px-5 py-2 border rounded-lg text-sm">취소</button>
            <button className="px-5 py-2 border rounded-lg text-sm">저장 후 계속 추가</button>
            <button
              onClick={handleSaveRecord}
              className="px-5 py-2 text-white rounded-lg text-sm shadow-md"
              style={{ backgroundImage: `url(${buttonGradient})`, backgroundSize: "cover" }}
            >
              저장
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
