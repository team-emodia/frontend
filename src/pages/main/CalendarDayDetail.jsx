import React from "react";
import { Link, useParams } from "react-router-dom";
import exercise1 from "../../assets/bg/exercise-bg-1.svg";
import exercise2 from "../../assets/bg/exercise-bg-2.svg";
import exercise3 from "../../assets/bg/exercise-bg-3.svg";
import timelineDot from "../../assets/bg/timeline-dot.svg";

function CalendarDayDetail() {
  const { day } = useParams();

  return (
    <div className="min-w-[1440px] min-h-screen bg-white font-sans px-12 py-10">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">{`2025년 09월 ${day}일 (금)`}</h1>
        <div className="flex gap-3">
          <Link to="/calendar" className="px-5 py-2 border rounded-full text-sm">달력으로</Link>
          <Link to={`/calendar/${day}/new`} className="px-5 py-2 bg-indigo-500 text-white rounded-full text-sm">새 기록 추가</Link>
        </div>
      </div>

      {/* 3컬럼 */}
      <div className="grid grid-cols-12 gap-8">
        {/* 요약 */}
        <section className="col-span-4 p-6 border rounded-2xl space-y-4">
          <p className="text-sm text-gray-500">오늘 요약</p>
          <p className="text-base font-semibold">Mood · 차분</p>
          <p className="text-sm">메모: 저녁 스트레칭 후 기분이 나아짐</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 border rounded-full text-xs">업무</span>
            <span className="px-3 py-1 border rounded-full text-xs">수면</span>
            <span className="px-3 py-1 border rounded-full text-xs">스트레칭</span>
          </div>
          <p className="text-sm">수면 <span className="font-bold">6.5h</span> · 물 섭취 <span className="font-bold">1.8L</span></p>
        </section>

        {/* 감정 타임라인 */}
        <section className="col-span-4 p-6 border rounded-2xl">
          <p className="font-bold mb-6 text-sm">감정 타임라인</p>
          <ul className="space-y-6 text-sm relative">
            {[
              ["08:10", "불안", "아침 준비"],
              ["13:20", "보통", "팀 미팅"],
              ["18:40", "차분", "산책 20분"],
              ["21:30", "만족", "스트레칭 후 가벼움"],
            ].map(([time, mood, desc], i) => (
              <li key={i} className="flex items-center gap-3">
                <img src={timelineDot} alt="dot" className="w-4 h-4" />
                <span>{time} · {mood} · {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 오늘의 운동 */}
        <section className="col-span-4 p-6 border rounded-2xl space-y-4">
          <p className="font-bold text-sm">오늘의 운동</p>
          <div className="space-y-3">
            <img src={exercise1} alt="운동1" className="rounded-xl" />
            <img src={exercise2} alt="운동2" className="rounded-xl" />
            <img src={exercise3} alt="운동3" className="rounded-xl" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default CalendarDayDetail;
