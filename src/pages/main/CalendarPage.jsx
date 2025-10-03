import React, { useState, useEffect } from "react";
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
import EmotionRecorder from "../../components/EmotionRecorder";
// ✅ API 불러오기
import { saveEmotionRecord, fetchEmotionRecords } from "../../api/EmotionAPI";
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

  // 현재 날짜 상태
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월의 일수 계산
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 요일 계산 (0=일요일, 1=월요일, ..., 6=토요일)
  const getWeekday = (day) => {
    return new Date(year, month - 1, day).getDay();
  };

  // 월의 첫날 요일 (0=일요일을 6으로 변환하여 월요일 시작)
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // 요일별 색상
  const getDayColor = (day) => {
    const weekday = getWeekday(day);
    if (weekday === 0) return "text-red-300"; // 일요일
    if (weekday === 6) return "text-blue-300"; // 토요일
    return "text-gray-700"; // 평일
  };

  const emotions = [
    { symbol: "😊", label: "행복", value: "happy" },
    { symbol: "🤩", label: "설렘", value: "excited" },
    { symbol: "😌", label: "차분", value: "calm" },
    { symbol: "😐", label: "보통", value: "neutral" },
    { symbol: "😡", label: "분노", value: "angry" },
    { symbol: "😰", label: "불안", value: "anxious" },
    { symbol: "🥱", label: "지침", value: "tired" },
    { symbol: "😰", label: "우울", value: "sad" },
  ];

  // 감정 기록 불러오기
  useEffect(() => {
    const loadEmotionRecords = async () => {
      try {
        const records = await fetchEmotionRecords();
        const recordsMap = {};

        records.forEach(record => {
          const recordDate = new Date(record.date);
          if (recordDate.getFullYear() === year && recordDate.getMonth() + 1 === month) {
            recordsMap[recordDate.getDate()] = record.emotion_emoji;
          }
        });

        setCalendarRecords(recordsMap);
      } catch (error) {
        console.error("감정 기록 불러오기 실패:", error);
      }
    };

    loadEmotionRecords();
  }, [year, month]);

  const toggleExercise = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  // 이전/다음 월 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // ✅ 감정 기록 저장 핸들러
  const handleEmotionSave = async (emotionData) => {
    if (selectedDay) {
      try {
        // 감정 라벨을 백엔드 value로 변환
        const emotionObj = emotions.find(e => e.label === emotionData.selectedEmoji);
        const emotionValue = emotionObj ? emotionObj.value : "neutral";

        const payload = {
          date: `${year}-${String(month).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`,
          emotion: emotionValue,
          memo: emotionData.memo || "",
        };

        await saveEmotionRecord(payload);

        // 달력에 이모지 표시
        setCalendarRecords({
          ...calendarRecords,
          [selectedDay]: emotionObj ? emotionObj.symbol : "😐"
        });

        setShowNewRecord(false);
        alert("감정 기록이 저장되었습니다!");
      } catch (error) {
        console.error("감정 기록 저장 실패:", error);
        const errorMsg = error.response?.data?.date?.[0] || error.response?.data?.detail || "저장 중 오류가 발생했습니다.";
        alert(errorMsg);
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
          className="bg-white rounded-2xl p-8 w-[600px] max-h-[80vh] overflow-y-auto relative shadow-2xl"
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
          {/* <div className="p-6 border rounded-2xl shadow-sm space-y-2">
            <p className="font-bold text-sm">Today's habits</p>
            <label className="flex gap-2 text-sm"><input type="checkbox" /> 물 6잔</label>
            <label className="flex gap-2 text-sm"><input type="checkbox" /> 스트레칭 10분</label>
            <label className="flex gap-2 text-sm"><input type="checkbox" /> 저녁 산책</label>
          </div> */}

          {/* Quick add */}
          {/* <div className="p-6 border rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">+ Quick add</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 border rounded-full text-xs">감정 기록</button>
              <button className="px-3 py-1 border rounded-full text-xs">운동 추가</button>
              <button className="px-3 py-1 border rounded-full text-xs">메모/태그</button>
            </div>
          </div> */}

          {/* Reminders */}
          {/* <div className="p-6 border rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">🔔 Reminders</p>
            <p className="text-xs mt-2">오전 8:30 감정 기록 알림</p>
            <p className="text-xs">저녁 9:00 스트레칭 루틴</p>
          </div> */}
        </section>

        {/* 달력 */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{year}년 {String(month).padStart(2, "0")}월</h1>
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                ◀
              </button>
              <button
                onClick={goToNextMonth}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                ▶
              </button>
            </div>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-3 mb-2">
            <div className="text-center text-sm font-semibold text-gray-600">월</div>
            <div className="text-center text-sm font-semibold text-gray-600">화</div>
            <div className="text-center text-sm font-semibold text-gray-600">수</div>
            <div className="text-center text-sm font-semibold text-gray-600">목</div>
            <div className="text-center text-sm font-semibold text-gray-600">금</div>
            <div className="text-center text-sm font-semibold text-blue-300">토</div>
            <div className="text-center text-sm font-semibold text-red-300">일</div>
          </div>

          {/* 달력 */}
          <div className="grid grid-cols-7 gap-3">
            {/* 빈 칸 채우기 */}
            {[...Array(startOffset)].map((_, i) => (
              <div key={`empty-${i}`} className="h-20"></div>
            ))}

            {/* 날짜 */}
            {[...Array(daysInMonth)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedDay(i + 1);
                  setShowNewRecord(true);
                }}
                className="h-20 border rounded-xl flex flex-col items-start justify-start p-2 text-sm hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 active:scale-95"
              >
                <span className={getDayColor(i + 1)}>{i + 1}</span>
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
          <EmotionRecorder
            onSave={handleEmotionSave}
            onCancel={() => setShowNewRecord(false)}
            showDetails={false}
          />
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
