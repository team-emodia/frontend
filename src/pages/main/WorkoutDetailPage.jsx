// src/pages/main/WorkoutDetailPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/Header";

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
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header variant="default" />

      <main className="flex-1 flex flex-col items-center p-8">
        <div className="w-full max-w-4xl">
          <button
            onClick={() => navigate("/workout")}
            className="mb-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            ← 목록으로
          </button>

          <h1 className="text-3xl font-bold mb-4">{workout.title}</h1>
          <p className="text-gray-600 mb-6">{workout.desc}</p>

          {/* 비디오 재생 */}
          <div className="bg-black rounded-xl overflow-hidden mb-6">
            <video
              controls
              className="w-full"
              src={workout.videoUrl}
            >
              브라우저가 비디오 재생을 지원하지 않습니다.
            </video>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">난이도</h3>
              <p className="text-gray-600">{workout.level}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">운동 종류</h3>
              <p className="text-gray-600">{workout.desc}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutDetailPage;
