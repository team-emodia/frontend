import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 배경 & 버튼 이미지
import chartGradient from "../../assets/bg/chart-gradient.svg";
// eslint-disable-next-line no-unused-vars
import chartLine from "../../assets/bg/chart-line.svg";
import buttonGradient from "../../assets/bg/button-gradient.svg";
import exercise1 from "../../assets/bg/exercise-bg-1.svg";
import exercise2 from "../../assets/bg/exercise-bg-2.svg";
import exercise3 from "../../assets/bg/exercise-bg-3.svg";
import timelineDot from "../../assets/bg/timeline-dot.svg";

// ✅ Stats와 연동된 컴포넌트 import
import WeeklyMoodChart from "../../components/WeeklyMoodChart";
// ✅ API 불러오기
import { saveEmotionRecord } from "../../api/EmotionAPI";
// ✅ 공통 Header
import Header from "../../common/Header";

function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  // ✅ 추가된 상태
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [calendarRecords, setCalendarRecords] = useState({});

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

  // ✅ 저장 버튼 동작
  const handleSaveRecord = async () => {
    if (selectedDay && selectedEmotion) {
      try {
        const payload = {
          date: `2025-09-${String(selectedDay).padStart(2, "0")}`,
          emotion: selectedEmotion,
          exercises: selectedExercises,
        };
        await saveEmotionRecord(payload);
        setCalendarRecords({ ...calendarRecords, [selectedDay]: selectedEmotion });
        setShowNewRecord(false);
        setShowDetail(true);
      } catch (error) {
        console.error("감정 기록 저장 실패:", error);
      }
    }
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
      {/* ✅ 공통 헤더 적용 */}
      <Header variant="default" />

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

          {/* Weekly mood */}
          <div className="p-6 border rounded-2xl shadow-sm">
            <p className="font-bold text-sm">Weekly mood</p>
            <div className="mt-4">
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
          {/* 상세 모달 내용 그대로 유지 */}
        </Modal>
      )}

      {/* 새 기록 모달 */}
      {showNewRecord && (
        <Modal onClose={() => setShowNewRecord(false)}>
          {/* 새 기록 모달 내용 그대로 유지 */}
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
