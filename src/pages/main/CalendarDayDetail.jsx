import React from "react";

const CalendarDayDetail = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">9월 30일 감정 기록</h2>
      <div className="w-4/5 h-3/5 bg-gray-50 rounded-lg shadow p-6">
        <p className="text-gray-600">😊 오늘은 기분이 좋았어요!</p>
      </div>
    </div>
  );
};

export default CalendarDayDetail;
