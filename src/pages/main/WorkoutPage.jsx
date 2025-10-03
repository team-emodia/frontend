// src/pages/main/WorkoutPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 공통 Header
import Header from "../../common/Header";
// Workout API
import { fetchWorkoutVideos } from "../../api/WorkoutAPI";

const WorkoutPage = () => {
  const navigate = useNavigate();

  // 상태
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTime, setSelectedTime] = useState("15분");
  const [selectedPart, setSelectedPart] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 필터 버튼 데이터
  const levels = ["초급", "중급", "상급"];
  const times = ["5분", "10분", "15분", "20분"];
  const parts = ["전신", "상체", "하체", "코어"];

  // 비디오 데이터 로드
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkoutVideos();
        const formattedWorkouts = data.flatMap((sport) =>
          sport.videos.map((video, index) => ({
            id: video.id,
            sportsId: sport.id,
            title: `${sport.name} ${index + 1}`,
            level: "초급",
            desc: `${sport.name} 운동`,
            videoUrl: video.video,
          }))
        );
        setWorkouts(formattedWorkouts);
      } catch (error) {
        console.error("운동 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* 공통 헤더 */}
      <Header variant="default" />

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
        {loading ? (
          <div className="col-span-3 text-center py-10">로딩 중...</div>
        ) : workouts.length === 0 ? (
          <div className="col-span-3 text-center py-10">등록된 운동이 없습니다.</div>
        ) : (
          workouts.map((w) => (
            <div
              key={w.id}
              onClick={() => navigate(`/workout/detail/${w.id}`, { state: { workout: w } })}
              className="bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
            >
              <span className="text-sm text-gray-700 bg-white px-3 py-1 rounded-full">{w.level}</span>
              <h3 className="mt-4 font-semibold text-lg">{w.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{w.desc}</p>
            </div>
          ))
        )}
      </div>

      {/* 다음 버튼 */}
      <div className="mt-10 mb-20">
        <button className="px-8 py-3 border rounded-full text-gray-700 hover:bg-gray-100">다음</button>
      </div>
    </div>
  );
};

export default WorkoutPage;
