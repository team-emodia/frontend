// src/pages/main/MainPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 로고 & 아이콘 & 배경
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import homeIcon from "../../assets/illustrations/icon-home.svg";
import bgMain from "../../assets/bg/bg-gradient-1.png";

const MainPage = () => {
  const navigate = useNavigate();

  // 로그인 상태를 state로 관리
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // localStorage 토큰 상태 감시 (토큰이 바뀌면 UI 업데이트)
  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // storage 이벤트 리스너 (다른 탭에서도 동기화 가능)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 즉시 UI 반영
    navigate("/login");
  };

  // Get Started 버튼 동작
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/start"); // 로그인 상태면 StartPage
    } else {
      navigate("/signup/restricted"); // 비로그인 → Restricted SignUp
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

        {/* 중앙 메뉴 (로그인 후에만 표시) */}
        {isLoggedIn && (
          <nav className="flex space-x-8 text-gray-800 font-medium">
            <button onClick={() => navigate("/about")} className="hover:text-purple-600">
              About
            </button>
            <button onClick={() => navigate("/calendar")} className="hover:text-purple-600">
              Calendar
            </button>
            <button onClick={() => navigate("/workout")} className="hover:text-purple-600">
              Workout
            </button>
            <button onClick={() => navigate("/stats")} className="hover:text-purple-600">
              Stats
            </button>
          </nav>
        )}

        {/* 우측 버튼 */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
              >
                Log out
              </button>
              <button
                onClick={() => navigate("/mypage")}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
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
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
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
          <button onClick={() => navigate("/about")} className="hover:text-purple-200">
            About
          </button>
          <button onClick={() => navigate("/calendar")} className="hover:text-purple-200">
            Calendar
          </button>
          <button onClick={() => navigate("/main")}>
            <img src={homeIcon} alt="Home" className="w-6 h-6 mx-2" />
          </button>
          <button onClick={() => navigate("/workout")} className="hover:text-purple-200">
            Workout
          </button>
          <button onClick={() => navigate("/stats")} className="hover:text-purple-200">
            Stats
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
