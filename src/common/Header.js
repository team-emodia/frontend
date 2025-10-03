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
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, [variant]);

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

  return (
    <header className="w-full flex justify-between items-center px-12 py-6 bg-white shadow-sm">
      {/* 좌측 로고 */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
        <h1 className="text-lg italic font-semibold text-gray-800">Emodia</h1>
      </div>

      {/* variant 분기 */}
      {variant === "default" && (
        <>
          {/* 중앙 네비 */}
          <nav className="flex space-x-8 text-gray-700 font-medium">
            <button onClick={() => navigate("/about")}>About</button>
            <button
              onClick={() =>
                isLoggedIn ? navigate("/calendar") : navigate("/login")
              }
            >
              Calendar
            </button>
            <button
              onClick={() =>
                isLoggedIn ? navigate("/workout") : navigate("/login")
              }
            >
              Workout
            </button>
            <button
              onClick={() =>
                isLoggedIn ? navigate("/stats") : navigate("/login")
              }
            >
              Stats
            </button>
          </nav>

          {/* 우측 버튼 */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-700">
                  {user?.username || "User"}
                </span>
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
        </>
      )}

      {/* 로그인 페이지 전용 */}
      {variant === "login" && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/signup-restricted")}
            className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Get Started
          </button>
        </div>
      )}

      {/* 회원가입 페이지 전용 */}
      {variant === "signup" && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup-restricted")}
            className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
