// src/pages/auth/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getAccessToken } from "../../api/AuthAPI";

// 이미지
import illustrationLogin from "../../assets/illustrations/illustration-login.svg";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";

// 공통 Header
import Header from "../../common/Header";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인된 상태면 메인으로 리다이렉트
  useEffect(() => {
    if (getAccessToken()) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("로그인 성공!");
      window.location.href = "/main"; // 페이지 새로고침으로 헤더 업데이트
    } catch (error) {
      console.error(error);
      alert("로그인 실패: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단바 */}
      <Header variant="default" />

      {/* 메인 */}
      <main className="flex flex-1 items-center justify-center px-8">
        {/* 왼쪽 일러스트 */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={illustrationLogin}
            alt="Login Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 오른쪽 로그인 폼 */}
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

          {/* 소셜 로그인 */}
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-50">
              <img src={logoKakao} alt="Kakao" className="w-5 h-5 mr-2" />
              Login with Kakao
            </button>
            <button className="w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-50">
              <img src={logoApple} alt="Apple" className="w-5 h-5 mr-2" />
              Login with Apple
            </button>
            <button className="w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-50">
              <img src={logoGoogle} alt="Google" className="w-5 h-5 mr-2" />
              Login with Google
            </button>
          </div>

          {/* 회원가입 안내 */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-purple-600 font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
