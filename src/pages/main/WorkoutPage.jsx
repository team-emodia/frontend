import React from "react";
import yogaIllustration from "../../assets/illustrations/illustration-yoga.svg";

const WorkoutPage = () => {
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center px-8">
      <h2 className="text-3xl font-bold mb-6">맞춤형 스트레칭</h2>
      <img src={yogaIllustration} alt="Yoga" className="w-72 h-72 mb-6" />
      <p className="text-gray-600 text-center max-w-lg">
        당신의 감정과 몸 상태를 기반으로 맞춤 스트레칭을 추천합니다. 💪
      </p>
    </div>
  );
};

export default WorkoutPage;
