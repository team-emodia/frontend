import React from "react";
import { Link } from "react-router-dom";
import chartGradient from "../../assets/bg/chart-gradient.svg";
import chartLine from "../../assets/bg/chart-line.svg";

function CalendarPage() {
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
          <a href="/calendar" className="font-semibold text-black">Calendar</a>
          <a href="/workout">Workout</a>
          <a href="/stats">Stats</a>
        </nav>
        <button className="px-5 py-2 bg-black text-white rounded-full text-sm">
          Get started
        </button>
      </header>

      {/* 본문 */}
      <main className="flex px-12 py-10 gap-12">
        {/* 좌측 위젯 */}
        <section className="w-[320px] space-y-6">
          {/* Today Overview */}
          <div className="p-6 border rounded-2xl">
            <p className="text-sm text-gray-500">✨ Today overview</p>
            <div className="flex items-center mt-4 gap-3">
              <img src={chartGradient} alt="Mood" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-xs text-gray-500">Mood</p>
                <p className="text-sm font-semibold">차분 <span className="text-green-600">+12%</span></p>
              </div>
            </div>
          </div>
          {/* Weekly mood */}
          <div className="p-6 border rounded-2xl">
            <p className="font-bold text-sm">Weekly mood</p>
            <div className="relative mt-4 w-full h-24">
              <img src={chartGradient} alt="Chart Fill" className="absolute inset-0 w-full h-full" />
              <img src={chartLine} alt="Chart Line" className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </section>

        {/* 달력 */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-6">2025년 09월</h1>
          <div className="grid grid-cols-7 gap-3">
            {[...Array(30)].map((_, i) => (
              <Link
                key={i}
                to={`/calendar/${i + 1}`}
                className="h-20 border rounded-xl flex items-center justify-center text-sm hover:bg-gray-100"
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CalendarPage;
