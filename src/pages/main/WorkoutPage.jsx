// src/pages/main/WorkoutPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 공통 Header
import Header from "../../common/Header";
// Workout API
import { fetchVideos } from "../../api/WorkoutAPI";

const WorkoutPage = () => {
  const navigate = useNavigate();

  // 상태
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 필터 버튼 데이터
  const levels = ["초급", "중급", "고급", "자세교정"];
  const parts = ["전신", "목", "어깨", "목어깨", "등", "골반", "코어"];

  // 필터 토글 함수
  const toggleLevel = (level) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  const togglePart = (part) => {
    setSelectedPart(selectedPart === part ? null : part);
  };

  // 비디오 데이터 로드
  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      try {
        // 필터 생성
        const filters = {};
        if (selectedLevel) filters.difficulty = selectedLevel;
        if (selectedPart) filters.body_part = selectedPart;

        const data = await fetchVideos(filters);
        let formattedWorkouts = data.map((video) => {
          // 파일명에서 난이도 제거
          let title = video.original_filename ? video.original_filename.replace('.mp4', '') : `${video.difficulty}_${video.body_part}_${video.exercise_type}`;
          // 난이도로 시작하는 경우 제거
          if (video.difficulty && title.startsWith(video.difficulty + '_')) {
            title = title.substring(video.difficulty.length + 1);
          }
          // 언더스코어(_)를 공백으로 변경
          title = title.replace(/_/g, ' ');

          return {
            id: video.id,
            title: title,
            level: video.difficulty || "초급",
            desc: `${video.body_part || ''} ${video.exercise_type || ''} - ${video.duration_minutes}분`,
            videoUrl: video.video_url,
            difficulty: video.difficulty,
            body_part: video.body_part,
            exercise_type: video.exercise_type,
            duration_minutes: video.duration_minutes,
          };
        });

        // 검색어 필터링
        if (search) {
          formattedWorkouts = formattedWorkouts.filter(
            (w) =>
              w.title.toLowerCase().includes(search.toLowerCase()) ||
              w.desc.toLowerCase().includes(search.toLowerCase()) ||
              w.body_part?.includes(search) ||
              w.exercise_type?.includes(search)
          );
        }

        setWorkouts(formattedWorkouts);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로
      } catch (error) {
        console.error("운동 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, [selectedLevel, selectedPart, search]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(workouts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkouts = workouts.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* 공통 헤더 */}
      <Header variant="default" />

      {/* 제목 */}
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold italic">Workout</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">검색해서 원하는 운동을 빠르게 찾아보세요</p>

        {/* 검색창 */}
        <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="예: 요가, 코어, 20분"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-purple-500"
          />
          <button className="bg-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base whitespace-nowrap">검색</button>
        </div>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
          {/* 난이도 */}
          {levels.map((lv) => (
            <button
              key={lv}
              onClick={() => toggleLevel(lv)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border ${
                selectedLevel === lv ? "bg-purple-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              {lv}
            </button>
          ))}
          {/* 부위 */}
          {parts.map((p) => (
            <button
              key={p}
              onClick={() => togglePart(p)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border ${
                selectedPart === p ? "bg-purple-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 운동 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="col-span-full text-center py-10">로딩 중...</div>
        ) : workouts.length === 0 ? (
          <div className="col-span-full text-center py-10">등록된 운동이 없습니다.</div>
        ) : (
          currentWorkouts.map((w) => (
            <div
              key={w.id}
              onClick={() => navigate(`/workout/detail/${w.id}`, { state: { workout: w } })}
              className="bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg p-4 sm:p-6 cursor-pointer hover:shadow-lg transition"
            >
              <span className="text-xs sm:text-sm text-gray-700 bg-white px-2 sm:px-3 py-1 rounded-full">{w.level}</span>
              <h3 className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg">{w.title}</h3>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {!loading && workouts.length > 0 && (
        <div className="mt-8 sm:mt-10 mb-12 sm:mb-20 flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            이전
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;
