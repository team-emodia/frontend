import React from "react";
import habitIllustration from "../../assets/illustrations/illustration-habit.svg";

const AboutPage = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-8">
      <h2 className="text-3xl font-bold mb-6">Emodia는 무엇을 제공하나요?</h2>
      <img
        src={habitIllustration}
        alt="Habit Illustration"
        className="w-80 h-80 mb-6"
      />
      <p className="text-lg text-gray-600 text-center max-w-xl">
        Emodia는 감정과 몸 상태를 기반으로 맞춤형 스트레칭, 호흡 습관,
        루틴을 제안합니다. 매일 기록하며 자신을 돌보는 습관을 만들어 보세요.
      </p>
    </div>
  );
};

export default AboutPage;
