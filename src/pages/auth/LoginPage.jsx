// src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/AuthAPI"; // 🔑 AuthAPI.js 사용

// 이미지
import illustrationLogin from "../../assets/illustrations/illustration-login.svg";
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("로그인 성공!");
      // 여기에 추후 DB에서 개인맞춤설정값에 따라 intro 분기처리
      navigate("/"); // 로그인 성공 → 메인(루트)
    } catch (error) {
      console.error(error);
      alert("로그인 실패: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleNavClick = (path) => {
    const isLoggedIn = !!localStorage.getItem("access");
    if (path === "/about") {
      navigate("/about");
    } else {
      if (isLoggedIn) {
        navigate(path);
      } else {
        navigate("/signup/restricted");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단바 */}
      <header className="w-full flex justify-between items-center px-12 py-6 bg-white shadow-sm">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
          <h1 className="text-lg italic font-semibold text-gray-800">Emodia</h1>
        </div>

        <nav className="flex space-x-8 text-gray-700 font-medium">
          <button onClick={() => handleNavClick("/about")} className="hover:text-purple-600">About</button>
          <button onClick={() => handleNavClick("/calendar")} className="hover:text-purple-600">Calendar</button>
          <button onClick={() => handleNavClick("/workout")} className="hover:text-purple-600">Workout</button>
          <button onClick={() => handleNavClick("/stats")} className="hover:text-purple-600">Stats</button>
        </nav>

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

      <main className="flex flex-1 items-center justify-center px-8">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={illustrationLogin}
            alt="Login Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        <div className="flex-1 max-w-md">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 italic">
            Nice to meet you
          </h2>

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

            <div className="flex justify-end text-sm text-gray-600">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Log in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
