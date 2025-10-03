// src/pages/auth/SignUpRestricted.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/AuthAPI"; // 🔑 AuthAPI.js 사용

// 컴포넌트
import Header from "../../common/Header";

// 이미지
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";
import signupBg from "../../assets/bg/signup-bg.png";

const SignUpRestricted = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("로그인 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* ✅ 헤더 교체 */}
      <Header variant="signup" />

      <main className="flex flex-1 items-center justify-center px-8">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={signupBg}
            alt="Restricted Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        <div className="flex-1 max-w-md">
          <p className="text-red-500 text-sm font-medium mb-2">
            로그인 후 이용해주세요
          </p>

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

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-purple-600 hover:underline mt-1"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
            >
              Log in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpRestricted;
