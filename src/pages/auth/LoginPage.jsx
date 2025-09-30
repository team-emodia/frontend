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

  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 버튼 클릭
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
    // 임시 로그인 성공 후 메인 페이지 이동
    navigate("/main");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단 로고 */}
      <header className="flex items-center px-10 py-6">
        <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10 mr-3" />
        <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
      </header>

      {/* 메인 컨텐츠 */}
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

            {/* 비밀번호 찾기 & 계정 생성 */}
            <div className="flex justify-between text-sm text-gray-600">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="hover:underline"
              >
                Forgot password?
              </button>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-purple-600 font-medium hover:underline"
              >
                Create Account
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

          {/* 소셜 로그인 */}
          <div className="space-y-3 mt-6">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50">
              <img src={logoKakao} alt="Kakao" className="w-6 h-6" />
              Login with Kakao
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50">
              <img src={logoApple} alt="Apple" className="w-6 h-6" />
              Login with Apple
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50">
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
