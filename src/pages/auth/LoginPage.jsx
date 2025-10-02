// src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import illustrationLogin from "../../assets/illustrations/illustration-login.svg";
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  // 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // TODO: 백엔드 연동 자리
      // const response = await axios.post("/api/login", { email, password });
      // const token = response.data.token;

      // 지금은 임시 토큰
      localStorage.setItem("token", "dummy-token");

      navigate("/main"); // 로그인 성공 → 메인
    } catch (error) {
      alert("로그인 실패");
    }
  };

  // 중앙 네비 처리 (로그인 페이지에서는 무조건 restricted except About)
  const handleNavClick = (path) => {
    if (path === "/about") {
      navigate("/about");
    } else {
      navigate("/signup/restricted");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* ================= 상단바 ================= */}
      <header className="w-full flex justify-between items-center px-12 py-6 bg-white shadow-sm">
        {/* 좌측 로고 */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/main")}
        >
          <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
          <h1 className="text-lg italic font-semibold text-gray-800">Emodia</h1>
        </div>

        {/* 중앙 메뉴 */}
        <nav className="flex space-x-8 text-gray-700 font-medium">
          <button onClick={() => handleNavClick("/about")} className="hover:text-purple-600">
            About
          </button>
          <button onClick={() => handleNavClick("/calendar")} className="hover:text-purple-600">
            Calendar
          </button>
          <button onClick={() => handleNavClick("/workout")} className="hover:text-purple-600">
            Workout
          </button>
          <button onClick={() => handleNavClick("/stats")} className="hover:text-purple-600">
            Stats
          </button>
        </nav>

        {/* 우측 버튼 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/signup/restricted")}
            className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* ================= 메인 컨텐츠 ================= */}
      <main className="flex flex-1 items-center justify-center px-8">
        {/* 왼쪽 이미지 */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={illustrationLogin}
            alt="Login Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 오른쪽 로그인 박스 */}
        <div className="flex-1 max-w-md">
          {/* 타이틀 */}
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 italic">
            Nice to meet you
          </h2>

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {/* 비밀번호 찾기 */}
            <div className="flex justify-end text-sm text-gray-600">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Log in
            </button>
          </form>

          {/* 소셜 로그인 버튼 */}
          <div className="space-y-3 mt-6">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition">
              <img src={logoKakao} alt="Kakao" className="w-6 h-6" />
              Login with Kakao
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition">
              <img src={logoApple} alt="Apple" className="w-6 h-6" />
              Login with Apple
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition">
              <img src={logoGoogle} alt="Google" className="w-6 h-6" />
              Login with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
