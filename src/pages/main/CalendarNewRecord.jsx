import React from "react";

const CalendarNewRecord = () => {
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">새로운 기록 추가</h2>
      <form className="w-4/5 max-w-md bg-white rounded-lg shadow p-6">
        <label className="block mb-4">
          <span className="text-gray-700">오늘의 기분</span>
          <select className="mt-2 w-full border rounded p-2">
            <option>😊 행복</option>
            <option>😐 보통</option>
            <option>😢 슬픔</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">메모</span>
          <textarea className="mt-2 w-full border rounded p-2" rows="4"></textarea>
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg"
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default CalendarNewRecord;
