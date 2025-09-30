import React from "react";
import { Link } from "react-router-dom";

const CalendarPage = () => {
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">감정 캘린더</h2>
      <div className="w-4/5 h-3/5 bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">📅 여기에 달력이 들어갑니다.</p>
      </div>

      <div className="mt-6 space-x-4">
        <Link
          to="/calendar/day"
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          하루 기록 보기
        </Link>
        <Link
          to="/calendar/new"
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          새 기록 추가
        </Link>
      </div>
    </div>
  );
};

export default CalendarPage;
