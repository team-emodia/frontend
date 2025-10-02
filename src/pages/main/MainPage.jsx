// src/pages/main/MainPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API
import { logout, getAccessToken } from "../../api/AuthAPI"; 
import ProfileAPI from "../../api/ProfileAPI"; // ✅ 프로필 API 추가

// 로고 & 아이콘 & 배경
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import homeIcon from "../../assets/illustrations/icon-home.svg";
import bgMain from "../../assets/bg/bg-gradient-1.png";

const MainPage = () => {
  const navigate = useNavigate();

  // 로그인 상태 및 사용자 정보
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const [user, setUser] = useState(null);

  // 페이지 진입 시 로그인 상태 확인 & 프로필 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const profile = await ProfileAPI.getProfile(); // ✅ 백엔드에서 username 불러오기
          setUser(profile); // profile 안에는 username, email, main_goal 등 들어있음
          setIsLoggedIn(true);
        } catch (err) {
          console.warn("프로필 불러오기 실패:", err);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();

    // storage 이벤트 감시 (다른 탭에서 토큰 변경 시 반영)
    const handleStorageChange = () => {
      fetchUser();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    try {
      logout(); // localStorage에서 토큰 제거
    } catch (error) {
      console.warn("로그아웃 처리 중 오류:", error);
    }
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  // Get Started 버튼
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/start");
    } else {
      navigate("/login");
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
          onClick={() => navigate("/")}
        >
          <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
          <h1 className="text-xl italic font-semibold text-gray-800">Emodia</h1>
        </div>

        {/* 우측 버튼 */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-white text-sm mr-2">
                {user?.username || "User"} {/* ✅ 실제 프로필 username */}
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
