// src/pages/main/WorkoutDetailPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import ExerciseVideo from "../../components/ExerciseVideo";

const WorkoutDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workout = location.state?.workout;

  if (!workout) {
    return (
      <div className="w-full h-screen flex flex-col bg-white">
        <Header variant="default" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">운동 정보를 찾을 수 없습니다.</p>
            <button
              onClick={() => navigate("/workout")}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="default" />

      <main className="flex flex-1 p-6 flex-col items-center">
        {/* 제목 및 설명 */}
        <h1 className="text-2xl font-bold mb-2">{workout.title}</h1>
        <p className="text-gray-600 mb-6">
          {workout.level} · {workout.body_part} · {workout.exercise_type} · {workout.duration_minutes}분
        </p>

        {/* 비디오 영역 */}
        <div className="w-full max-w-6xl grid grid-cols-1 justify-items-center gap-6">
          <div className="w-1/2">
            <ExerciseVideo
              videoUrl={workout.videoUrl}
              title={workout.title}
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/workout")}
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            목록으로 돌아가기
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            홈으로 이동
          </button>
        </div>
      </main>
    </div>
  );
};

export default WorkoutDetailPage;
