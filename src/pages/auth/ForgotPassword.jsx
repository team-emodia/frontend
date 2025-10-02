import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import illustrationLogin from "../../assets/illustrations/illustration-login.svg";
import logoEmodia from "../../assets/logo/logo-emodia.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("email"); // email or sms
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 타이머 상태
  const [timer, setTimer] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [sent, setSent] = useState(false); // 최초 전송 여부

  // 타이머 동작
  useEffect(() => {
    let countdown;
    if (isCounting && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(countdown);
  }, [isCounting, timer]);

  // 인증 코드 발송 / 재전송
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
    setSent(true); // 최초 발송 이후부터는 재전송 버튼으로 전환

    console.log("인증 코드 발송 요청:", { method, email, phone });

    // 실제 API 대신 시뮬레이션
    setTimeout(() => {
      console.log(
        method === "email"
          ? `인증 코드 발송 완료 (이메일: ${email})`
          : `인증 코드 발송 완료 (전화번호: ${phone})`
      );
      alert(
        method === "email"
          ? "인증 코드가 이메일로 전송되었습니다."
          : "인증 코드가 문자로 전송되었습니다."
      );
    }, 2000);
  };

  // 비밀번호 재설정
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("비밀번호 재설정 요청:", {
      method,
      email,
      phone,
      code,
      newPassword,
      confirmPassword,
    });
    alert("비밀번호 재설정이 완료되었습니다.");
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 상단바 */}
      <header className="flex justify-between items-center px-12 py-6">
        {/* 좌측 로고 */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/main")}
        >
          <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
          <h1 className="text-xl italic font-semibold text-gray-800">Emodia</h1>
        </div>

        {/* 중앙 메뉴 */}
        <nav className="flex space-x-8 text-gray-700 font-medium">
          <button onClick={() => navigate("/about")} className="hover:text-purple-600">About</button>
          <button onClick={() => navigate("/calendar")} className="hover:text-purple-600">Calendar</button>
          <button onClick={() => navigate("/workout")} className="hover:text-purple-600">Workout</button>
          <button onClick={() => navigate("/stats")} className="hover:text-purple-600">Stats</button>
        </nav>

        {/* 우측 버튼 */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/start")}
            className="px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
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
            src={illustrationLogin}
            alt="Forgot Illustration"
            className="rounded-2xl shadow-lg max-w-md"
          />
        </div>

        {/* 오른쪽 폼 */}
        <div className="flex-1 max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">비밀번호 재설정</h2>
          <p className="text-gray-600 mb-6">
            계정에 접근할 수 있도록 아래 방법 중 하나를 선택하세요
          </p>

          {/* 이메일/문자 선택 */}
          <div className="flex mb-6 space-x-2">
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={`flex-1 py-2 rounded-full font-medium border ${
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
              className={`flex-1 py-2 rounded-full font-medium border ${
                method === "sms"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              문자로 받기
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 or 전화번호 */}
            {method === "email" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일 주소
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  required
                />
              </div>
            )}

            {/* 인증 코드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                인증 코드
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="6자리 코드"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isCounting}
                  className={`px-3 py-3 rounded-xl border text-sm ${
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
            </div>

            {/* 새 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                새 비밀번호
              </label>
              <input
                type="password"
                placeholder="영문/숫자/특수문자 8자 이상"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
                required
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 확인
              </label>
              <input
                type="password"
                placeholder="다시 입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
                required
              />
            </div>

            {/* 비밀번호 재설정 버튼 */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              비밀번호 재설정
            </button>
          </form>

          {/* 고객센터 문의 */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              고객센터 문의
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
