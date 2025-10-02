// src/pages/auth/SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 로고 이미지
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";

// 회원가입 좌측 배경 이미지
import signupBg from "../../assets/bg/signup-bg.png";

const SignUpPage = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 회원가입 핸들러
  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 시도:", { username, email, password });

    // ✅ 회원가입 성공 → 자동 로그인 처리
    localStorage.setItem("token", "true"); // 로그인 상태 저장

    // ✅ IntroPage(온보딩)로 이동
    navigate("/intro");
  };

  // 이메일 중복확인 버튼
  const handleCheckEmail = () => {
    console.log("중복확인 요청:", email);
    // 🔗 API 요청 연결 가능
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* ===== 상단 로고 + 네비게이션 ===== */}
      <header className="flex justify-between items-center px-10 py-6">
        {/* 로고 */}
        <div className="flex items-center">
          <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
        </div>

        {/* 상단 네비 */}
        <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/calendar")}>Calendar</button>
          <button onClick={() => navigate("/workout")}>Workout</button>
          <button onClick={() => navigate("/stats")}>Stats</button>
        </nav>

        {/* ✅ Get Started만 유지 */}
        <div>
          <button
            onClick={() => navigate("/start")}
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* ===== 메인 컨텐츠 ===== */}
      <main className="flex flex-1 items-center justify-center px-8">
        {/* 좌측 이미지 */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={signupBg}
            alt="Signup Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 우측 폼 */}
        <div className="flex-1 max-w-md">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 italic">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* User Name */}
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {/* Email + Check 버튼 */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={handleCheckEmail}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
              >
                Check
              </button>
            </div>

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {/* Check Password */}
            <input
              type="password"
              placeholder="Check the password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
            >
              Create Account
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

            {/* 로그인 페이지 이동 */}
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-purple-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
