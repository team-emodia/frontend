// src/pages/auth/SignUpPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/AuthAPI";

// 이미지
import signupBg from "../../assets/bg/signup-bg.png";
import logoKakao from "../../assets/logo/logo-kakao.svg";
import logoApple from "../../assets/logo/logo-apple.svg";
import logoGoogle from "../../assets/logo/logo-google.svg";

// 공통 Header
import Header from "../../common/Header";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "❌ 비밀번호는 최소 8자리 이상이어야 합니다.";
    if (!/[A-Za-z]/.test(pwd) || !/[0-9]/.test(pwd))
      return "❌ 비밀번호는 영문과 숫자를 모두 포함해야 합니다.";
    return "✅ 사용 가능한 비밀번호입니다.";
  };

  useEffect(() => {
    if (password.length === 0 && passwordCheck.length === 0) {
      setPasswordMessage("");
      setIsPasswordValid(false);
      return;
    }

    const strengthMsg = validatePassword(password);
    if (strengthMsg.includes("❌")) {
      setPasswordMessage(strengthMsg);
      setIsPasswordValid(false);
      return;
    }

    if (passwordCheck.length > 0) {
      if (password === passwordCheck) {
        setPasswordMessage("✅ 비밀번호가 일치합니다.");
        setIsPasswordValid(true);
      } else {
        setPasswordMessage("❌ 비밀번호가 일치하지 않습니다.");
        setIsPasswordValid(false);
      }
    } else {
      setPasswordMessage(strengthMsg);
      setIsPasswordValid(false);
    }
  }, [password, passwordCheck]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      alert("비밀번호 조건을 확인해주세요.");
      return;
    }

    try {
      await signup(username, email, password, passwordCheck);
      alert("회원가입이 완료되었습니다!");
      navigate("/intro");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단바 (signup 모드) */}
      <Header variant="signup" />

      {/* 메인 */}
      <main className="flex flex-1 items-center justify-center px-8">
        {/* 왼쪽 이미지 */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={signupBg}
            alt="Signup Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 오른쪽 회원가입 폼 */}
        <div className="flex-1 max-w-md">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 italic">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-5">
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="password"
              placeholder="Password (최소 8자리, 영문+숫자 포함)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="password"
              placeholder="Check the password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
              required
            />

            {passwordMessage && (
              <p
                className={`text-sm ${
                  isPasswordValid ? "text-green-600" : "text-red-500"
                }`}
              >
                {passwordMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isPasswordValid
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Create Account
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

          {/* 로그인 페이지 이동 */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-600 font-medium hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
