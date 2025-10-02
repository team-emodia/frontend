// src/pages/auth/SignUpRestricted.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";
import signupBg from "../../assets/bg/signup-bg.png";

const SignUpRestricted = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });

    // ✅ 로그인 성공 처리 예시 (키 통일)
    localStorage.setItem("authToken", "true");
    navigate("/main");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단 네비게이션 */}
      <header className="flex justify-between items-center px-10 py-6">
        {/* 로고 */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/main")} // ✅ 메인으로 이동
        >
          <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
        </div>

        {/* 메뉴 */}
        <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">
          {/* 활성화 버튼 */}
          <button
            onClick={() => navigate("/about")}
            className="hover:text-purple-600"
          >
            About
          </button>

          {/* 비활성화 버튼들 */}
          <span className="text-gray-400 cursor-not-allowed">Calendar</span>
          <span className="text-gray-400 cursor-not-allowed">Workout</span>
          <span className="text-gray-400 cursor-not-allowed">Stats</span>
        </nav>

        {/* Sign up / Get Started */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/signup/restricted")} // ✅ 수정됨
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 items-center justify-center px-8">
        {/* 좌측 이미지 */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={signupBg}
            alt="Restricted Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 우측 로그인 폼 */}
        <div className="flex-1 max-w-md">
          <p className="text-red-500 text-sm font-medium mb-2">
            로그인 후 이용해주세요
          </p>

          <h2 className="text-2xl font-semibold mb-8 text-gray-900 italic">
            Nice to meet you
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {/* Forgot password (input 아래 우측 정렬) */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-purple-600 hover:underline mt-1"
              >
                Forgot password?
              </button>
            </div>

            {/* 로그인 버튼 (Gradient) */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
            >
              Log in
            </button>

            {/* 소셜 로그인 */}
            <div className="space-y-3">
              <button
                type="button"
                className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <img src={logoKakao} alt="Kakao" className="w-5 h-5 mr-2" />
                Login with Kakao
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <img src={logoApple} alt="Apple" className="w-5 h-5 mr-2" />
                Login with Apple
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <img src={logoGoogle} alt="Google" className="w-5 h-5 mr-2" />
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpRestricted;
