// src/pages/auth/ForgotPassword.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import Header from "../../common/Header";

// 이미지
import illustrationLogin from "../../assets/illustrations/illustration-login.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [timer, setTimer] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [sent, setSent] = useState(false);

  const inputsRef = useRef([]);

  // 타이머
  useEffect(() => {
    let countdown;
    if (isCounting && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(countdown);
  }, [isCounting, timer]);

  // 인증 코드 발송
  const handleResend = () => {
    if (method === "email" && !email) {
      alert("이메일 주소를 입력해주세요.");
      return;
    }
    if (method === "sms" && !phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    setTimer(60);
    setIsCounting(true);
    setSent(true);
    setTimeout(() => {
      alert(
        method === "email"
          ? "인증 코드가 이메일로 전송되었습니다."
          : "인증 코드가 문자로 전송되었습니다."
      );
    }, 1000);
  };

  // 인증코드 입력 핸들러
  const handleCodeChange = (val, idx) => {
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[idx] = val;
      setCode(newCode);
      if (val && idx < 5) inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  // 비밀번호 재설정
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("비밀번호 재설정이 완료되었습니다.");
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* ✅ 헤더 교체 */}
      <Header variant="login" />

      {/* 메인 */}
      <main className="flex flex-1 items-center justify-center px-8">
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-20">
          {/* 왼쪽 이미지 */}
          <div className="flex-1 flex justify-center">
            <img
              src={illustrationLogin}
              alt="Forgot Illustration"
              className="rounded-2xl shadow-lg max-w-sm"
            />
          </div>

          {/* 오른쪽 폼 */}
          <div className="flex-1 max-w-md">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              비밀번호 재설정
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              계정에 접근할 수 있도록 아래 방법 중 하나를 선택하세요
            </p>

            {/* 이메일/문자 선택 */}
            <div className="flex mb-4 space-x-2">
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 py-2 rounded-full text-sm border ${
                  method === "email"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                이메일로 받기
              </button>
              <button
                type="button"
                onClick={() => setMethod("sms")}
                className={`flex-1 py-2 rounded-full text-sm border ${
                  method === "sms"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                문자로 받기
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-sm w-[320px]"
            >
              {/* 이메일 or 전화번호 */}
              {method === "email" ? (
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  required
                />
              ) : (
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  required
                />
              )}

              {/* 인증 코드 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  인증 코드
                </label>
                <div className="flex space-x-2">
                  {code.map((c, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      type="text"
                      maxLength="1"
                      value={c}
                      onChange={(e) => handleCodeChange(e.target.value, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="w-10 h-10 text-center text-base font-medium rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isCounting}
                  className={`mt-2 px-3 py-1 rounded-lg border text-xs ${
                    isCounting
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {!sent
                    ? "인증 코드 보내기"
                    : isCounting
                    ? `재전송 (${timer}s)`
                    : "재전송"}
                </button>
              </div>

              {/* 새 비밀번호 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  새 비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="영문/숫자/특수문자 8자 이상"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400"
                  >
                    {showNewPassword ? "숨기기" : "보기"}
                  </button>
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="다시 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400"
                  >
                    {showConfirmPassword ? "숨기기" : "보기"}
                  </button>
                </div>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
              >
                비밀번호 재설정
              </button>
            </form>

            {/* 하단 링크 */}
            <div className="text-center mt-4 space-y-1">
              <button
                type="button"
                className="text-xs text-gray-500 underline hover:text-gray-700"
              >
                고객센터 문의
              </button>
              <div>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-xs text-gray-500 underline hover:text-gray-700"
                >
                  기억났나요? 로그인으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
