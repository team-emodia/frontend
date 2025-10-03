// src/pages/main/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// 로고 & 아이콘 & 배경
import homeIcon from "../../assets/illustrations/icon-home.svg";
import bgMain from "../../assets/bg/bg-gradient-1.png";

// 공통 Header
import Header from "../../common/Header";

const MainPage = () => {
  const navigate = useNavigate();

  // 중앙 네비 클릭 처리 (로그인 여부는 Header에서 관리)
  const handleNavClick = (path) => {
    const token = localStorage.getItem("access"); // ✅ AuthAPI.getAccessToken()과 동일 동작
    if (token) {
      navigate(path);
    } else {
      navigate("/signup-restricted");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgMain})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ================= 상단바 ================= */}
      <Header />

      {/* ================= 중앙 콘텐츠 ================= */}
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        {/* 중앙 로고 텍스트 */}
        <h1 className="text-6xl italic font-bold text-white mb-16 drop-shadow-lg">
          Emodia
        </h1>

        {/* 하단 네비 메뉴 */}
        <div className="flex space-x-12 text-white font-medium text-lg">
          {/* About */}
          <button
            onClick={() => navigate("/about")}
            className="hover:text-purple-200"
          >
            About
          </button>

          {/* Calendar */}
          <button
            onClick={() => handleNavClick("/calendar")}
            className="hover:text-purple-200"
          >
            Calendar
          </button>

          {/* Home */}
          <button onClick={() => navigate("/")}>
            <img src={homeIcon} alt="Home" className="w-6 h-6 mx-2" />
          </button>

          {/* Workout */}
          <button
            onClick={() => handleNavClick("/workout")}
            className="hover:text-purple-200"
          >
            Workout
          </button>

          {/* Stats */}
          <button
            onClick={() => handleNavClick("/stats")}
            className="hover:text-purple-200"
          >
            Stats
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
