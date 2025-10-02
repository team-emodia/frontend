// src/pages/main/MainPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API
import * as AuthAPI from "../../api/AuthAPI";

// 로고 & 아이콘 & 배경
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import homeIcon from "../../assets/illustrations/icon-home.svg";
import bgMain from "../../assets/bg/bg-gradient-1.png";

const MainPage = () => {
  const navigate = useNavigate();

  // 로그인 상태 및 사용자 정보
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);

  // 페이지 진입 시 사용자 정보 확인
  useEffect(() => {
    const checkUser = async () => {
      // 1) 백엔드 준비 후: AuthAPI.getProfile() 사용
      if (typeof AuthAPI.getProfile === "function") {
        try {
          const data = await AuthAPI.getProfile();
          if (data) {
            setIsLoggedIn(true);
            setUser(data);
            return;
          }
        } catch (err) {
          console.warn("getProfile 호출 실패, localStorage fallback 사용:", err);
        }
      }

      // 2) fallback: localStorage 확인
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
        setUser({ username: "Guest" }); // ✅ 임시 사용자명
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkUser();

    // storage 이벤트 감시 (다른 탭에서 토큰 변경 시 반영)
    const handleStorageChange = () => {
      checkUser();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    try {
      if (typeof AuthAPI.logout === "function") {
        await AuthAPI.logout(); // 서버 로그아웃 (백엔드 준비 후 동작)
      }
    } catch (error) {
      console.warn("서버 로그아웃 실패:", error);
    }
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/main");
  };

  // Get Started 버튼
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/start");
    } else {
      navigate("/signup-restricted");
    }
  };

  // 중앙 네비 클릭 처리
  const handleNavClick = (path) => {
    if (isLoggedIn) {
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
      <header className="w-full flex justify-between items-center px-12 py-6 bg-white/30 backdrop-blur-md">
        {/* 좌측 로고 */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/main")}
        >
          <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
          <h1 className="text-xl italic font-semibold text-gray-800">Emodia</h1>
        </div>

        {/* 우측 버튼 */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-white text-sm mr-2">
                {user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white/20 transition"
              >
                Log out
              </button>
              <button
                onClick={() => navigate("/mypage")}
                className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white/20 transition"
              >
                My page
              </button>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white/20 transition"
              >
                Log in
              </button>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </header>

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
          <button onClick={() => navigate("/main")}>
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
