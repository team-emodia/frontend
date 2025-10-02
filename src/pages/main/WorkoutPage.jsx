// src/pages/main/WorkoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 스타일 예시 (Tailwind 기반)
import logoEmodia from "../../assets/logo/logo-emodia.svg";

const WorkoutPage = () => {
  const navigate = useNavigate();

  // 상태
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTime, setSelectedTime] = useState("15분");
  const [selectedPart, setSelectedPart] = useState(null);

  // 필터 버튼 데이터
  const levels = ["초급", "중급", "상급"];
  const times = ["5분", "10분", "15분", "20분"];
  const parts = ["전신", "상체", "하체", "코어"];

  // 샘플 운동 데이터 (추후 API 연동 가능)
  const workouts = [
    { id: 1, title: "목 어깨 스트레칭 5분", level: "초급", desc: "난이도: 초급 · 스트레스 해소" },
    { id: 2, title: "요가 플로우 10분", level: "중급", desc: "난이도: 중급 · 전신 스트레칭" },
    { id: 3, title: "전신 스트레칭 15분", level: "상급", desc: "난이도: 상급 · 활력 충전" },
    { id: 4, title: "수면 릴렉스 8분", level: "초급", desc: "난이도: 초급 · 깊은 휴식" },
    { id: 5, title: "코어 집중 7분", level: "중급", desc: "난이도: 중급 · 복근" },
    { id: 6, title: "상체 운동 15분", level: "상급", desc: "난이도: 상급 · 상체 스트레칭" },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* 상단 네비게이션 */}
      <header className="w-full flex justify-between items-center px-12 py-6">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
          <h1 className="text-xl italic font-semibold text-gray-800">Emodia</h1>
        </div>
        <nav className="flex space-x-10 text-lg font-medium">
          <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-purple-500">About</button>
          <button onClick={() => navigate("/calendar")} className="text-gray-700 hover:text-purple-500">Calendar</button>
          <button className="text-purple-500 border-b-2 border-purple-500">Workout</button>
          <button onClick={() => navigate("/stats")} className="text-gray-700 hover:text-purple-500">Stats</button>
        </nav>
        <button
          onClick={() => navigate("/signuprestricted")}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Get started
        </button>
      </header>

      {/* 제목 */}
      <div className="w-full max-w-5xl px-6 mt-10">
        <h2 className="text-3xl font-bold italic">Workout</h2>
        <p className="text-gray-500 mt-2">검색해서 원하는 운동을 빠르게 찾아보세요</p>

        {/* 검색창 */}
        <div className="flex items-center space-x-3 mt-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="예: 요가, 하체, 20분"
            className="w-full px-4 py-3 border rounded-lg focus:outline-purple-500"
          />
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg">검색</button>
        </div>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap gap-3 mt-6">
          {/* 난이도 */}
          {levels.map((lv) => (
            <button
              key={lv}
              onClick={() => setSelectedLevel(lv)}
              className={`px-4 py-2 rounded-full border ${
                selectedLevel === lv ? "bg-purple-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              {lv}
            </button>
          ))}
          {/* 소요시간 */}
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`px-4 py-2 rounded-full border ${
                selectedTime === t ? "bg-purple-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
          {/* 부위 */}
          {parts.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPart(p)}
              className={`px-4 py-2 rounded-full border ${
                selectedPart === p ? "bg-purple-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 운동 카드 */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl mt-10 px-6">
        {workouts.map((w) => (
          <div
            key={w.id}
            onClick={() => navigate(`/workout/detail/${w.id}`)}
            className="bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
          >
            <span className="text-sm text-gray-700 bg-white px-3 py-1 rounded-full">{w.level}</span>
            <h3 className="mt-4 font-semibold text-lg">{w.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{w.desc}</p>
          </div>
        ))}
      </div>

      {/* 다음 버튼 */}
      <div className="mt-10 mb-20">
        <button className="px-8 py-3 border rounded-full text-gray-700 hover:bg-gray-100">다음</button>
      </div>
    </div>
  );
};

export default WorkoutPage;
