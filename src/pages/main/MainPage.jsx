// src/pages/main/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import bgGradient from "../../assets/bg/bg-gradient-1.png";
import logoEmodia from "../../assets/logo/logo-emodia.svg";

const MainPage = () => {
  const navigate = useNavigate();

  // 로그인 여부 체크 (임시: localStorage 사용)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Get started 버튼 핸들러
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/calendar"); // 로그인 되어 있으면 캘린더로
    } else {
      navigate("/signup/restricted"); // 아니면 제한된 회원가입 페이지로
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgGradient})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ===== 상단 헤더 ===== */}
      <header className="w-full flex justify-between items-center px-12 py-6 bg-white/30 backdrop-blur-md shadow-sm">
        {/* 로고 */}
        <div className="flex items-center space-x-3">
          <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10" />
          <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
        </div>

        {/* 로그인 / 시작 버튼 */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-gray-400 text-sm text-gray-800 hover:bg-gray-100"
          >
            Log in
          </button>
          <button
            onClick={handleGetStarted}
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm hover:bg-gray-700"
          >
            Get started
          </button>
        </div>
      </header>

      {/* ===== 메인 컨텐츠 ===== */}
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        {/* 중앙 타이틀 */}
        <h1 className="text-7xl font-semibold italic text-white drop-shadow-lg">
          Emodia
        </h1>

        {/* 중앙 네비게이션 */}
        <nav className="mt-20 flex space-x-16">
          <button
            className="text-lg font-medium text-white hover:text-purple-200"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className="text-lg font-medium text-white hover:text-purple-200"
            onClick={() => navigate("/calendar")}
          >
            Calendar
          </button>
          <button
            className="text-lg font-medium text-white hover:text-purple-200"
            onClick={() => navigate("/workout")}
          >
            Workout
          </button>
          <button
            className="text-lg font-medium text-white hover:text-purple-200"
            onClick={() => navigate("/stats")}
          >
            Stats
          </button>
        </nav>
      </main>
    </div>
  );
};

export default MainPage;
