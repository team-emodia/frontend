// src/common/Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API
import { logout, getAccessToken } from "../api/AuthAPI";
import ProfileAPI from "../api/ProfileAPI";

// 로고
import logoEmodia from "../assets/logo/logo-emodia.svg";

const Header = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const [user, setUser] = useState(null);

  // 로그인 상태 / 프로필 불러오기 (default 전용)
  useEffect(() => {
    if (variant !== "default") return;

    const fetchUser = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const profile = await ProfileAPI.getProfile();
          setUser(profile);
          setIsLoggedIn(true);
        } catch {
          // 토큰이 유효하지 않으면 localStorage 정리
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();
  }, [variant]);

  // 토큰 변경 감지
  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      setIsLoggedIn(!!token);
      if (!token) {
        setUser(null);
      }
    };

    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleGetStarted = () => {
    if (isLoggedIn) navigate("/start");
    else navigate("/login");
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center px-4 sm:px-6 md:px-12 py-4 md:py-6 bg-white shadow-sm relative">
      {/* 좌측 로고 */}
      <div
        className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logoEmodia} alt="Emodia Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
        <h1 className="text-lg sm:text-xl italic font-semibold text-gray-800">Emodia</h1>
      </div>

      {/* variant 분기 */}
      {variant === "default" && (
        <>
          {/* 중앙 네비 - 데스크톱만 표시 */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-base xl:text-lg font-medium absolute left-1/2 transform -translate-x-1/2">
            <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-purple-500">About</button>
            <button
              onClick={() =>
                isLoggedIn ? navigate("/calendar") : navigate("/login")
              }
              className="text-gray-700 hover:text-purple-500"
            >
              Calendar
            </button>
            <button
              onClick={() =>
                isLoggedIn ? navigate("/workout") : navigate("/login")
              }
              className="text-gray-700 hover:text-purple-500"
            >
              Workout
            </button>
            <button
              onClick={() =>
                isLoggedIn ? navigate("/stats") : navigate("/login")
              }
              className="text-gray-700 hover:text-purple-500"
            >
              Stats
            </button>
          </nav>

          {/* 우측 버튼 - 데스크톱 */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 ml-auto">
            {isLoggedIn ? (
              <>
                <span className="text-xs xl:text-sm text-gray-700 hidden xl:block">
                  {user?.username || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 xl:px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-xs xl:text-sm font-medium hover:bg-gray-100"
                >
                  Log out
                </button>
                <button
                  onClick={() => navigate("/mypage")}
                  className="px-3 xl:px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-xs xl:text-sm font-medium hover:bg-gray-100"
                >
                  My page
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-4 xl:px-6 py-2 rounded-full bg-black text-white text-xs xl:text-sm font-semibold hover:bg-gray-900 transition"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 xl:px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-xs xl:text-sm font-medium hover:bg-gray-100"
                >
                  Log in
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-4 xl:px-6 py-2 rounded-full bg-black text-white text-xs xl:text-sm font-semibold hover:bg-gray-900 transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <button
            className="lg:hidden ml-auto text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 모바일 메뉴 드롭다운 */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden z-50">
              <nav className="flex flex-col p-4 space-y-3">
                <button onClick={() => { navigate("/about"); setMobileMenuOpen(false); }} className="text-left text-gray-700 hover:text-purple-500 py-2">About</button>
                <button onClick={() => { isLoggedIn ? navigate("/calendar") : navigate("/login"); setMobileMenuOpen(false); }} className="text-left text-gray-700 hover:text-purple-500 py-2">Calendar</button>
                <button onClick={() => { isLoggedIn ? navigate("/workout") : navigate("/login"); setMobileMenuOpen(false); }} className="text-left text-gray-700 hover:text-purple-500 py-2">Workout</button>
                <button onClick={() => { isLoggedIn ? navigate("/stats") : navigate("/login"); setMobileMenuOpen(false); }} className="text-left text-gray-700 hover:text-purple-500 py-2">Stats</button>
                <hr className="my-2" />
                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-gray-700 py-2">{user?.username || "User"}</span>
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-left px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100">Log out</button>
                    <button onClick={() => { navigate("/mypage"); setMobileMenuOpen(false); }} className="text-left px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100">My page</button>
                    <button onClick={() => { handleGetStarted(); setMobileMenuOpen(false); }} className="px-4 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">Get Started</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} className="text-left px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100">Log in</button>
                    <button onClick={() => { handleGetStarted(); setMobileMenuOpen(false); }} className="px-4 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">Get Started</button>
                  </>
                )}
              </nav>
            </div>
          )}
        </>
      )}

      {/* 로그인 페이지 전용 */}
      {variant === "login" && (
        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
          <button
            onClick={() => navigate("/signup")}
            className="px-3 sm:px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-100"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/signup-restricted")}
            className="px-4 sm:px-6 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-gray-900 transition"
          >
            Get Started
          </button>
        </div>
      )}

      {/* 회원가입 페이지 전용 */}
      {variant === "signup" && (
        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
          <button
            onClick={() => navigate("/login")}
            className="px-3 sm:px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-100"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup-restricted")}
            className="px-4 sm:px-6 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-gray-900 transition"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
