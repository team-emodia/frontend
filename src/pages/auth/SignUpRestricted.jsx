import React from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import logoEmodia from "../../assets/logo/logo-emodia.svg";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";
import illustrationRestricted from "../../assets/illustrations/illustration-restricted-signup.svg";

const SignUpRestricted = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단 네비게이션 */}
      <header className="flex justify-between items-center px-10 py-6">
        {/* 로고 */}
        <div className="flex items-center">
          <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
        </div>

        {/* 메뉴 */}
        <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/calendar")}>Calendar</button>
          <button onClick={() => navigate("/workout")}>Workout</button>
          <button onClick={() => navigate("/stats")}>Stats</button>
        </nav>

        {/* 로그인/시작 버튼 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 items-center justify-center px-8">
        {/* 왼쪽 이미지 */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={illustrationRestricted}
            alt="Restricted Signup Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 오른쪽 폼 */}
        <div className="flex-1 max-w-md">
          <p className="text-red-500 text-sm font-medium mb-2">
            로그인 후 이용해주세요
          </p>
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 italic">
            Create Account
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="User Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            />

            {/* 회원가입 버튼 (비활성화) */}
            <button
              type="button"
              disabled
              className="w-full py-3 rounded-xl bg-purple-500 text-white font-semibold opacity-50 cursor-not-allowed"
            >
              Create Account
            </button>

            {/* 소셜 로그인 버튼 (비활성화) */}
            <div className="space-y-3">
              <button
                type="button"
                disabled
                className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 text-gray-400 bg-gray-100 opacity-70 cursor-not-allowed"
              >
                <img src={logoKakao} alt="Kakao" className="w-5 h-5 mr-2" />
                Login with Kakao
              </button>
              <button
                type="button"
                disabled
                className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 text-gray-400 bg-gray-100 opacity-70 cursor-not-allowed"
              >
                <img src={logoApple} alt="Apple" className="w-5 h-5 mr-2" />
                Login with Apple
              </button>
              <button
                type="button"
                disabled
                className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 text-gray-400 bg-gray-100 opacity-70 cursor-not-allowed"
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
