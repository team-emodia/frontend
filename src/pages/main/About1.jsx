import React from "react";
import { useNavigate } from "react-router-dom";
import logoEmodia from "../../assets/logo/logo-emodia.svg";

const About1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 네비게이션 */}
      <header className="w-full flex justify-between items-center px-12 py-6 border-b">
        {/* 로고 */}
        <div className="flex items-center space-x-3">
          <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10" />
          <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
        </div>

        {/* 네비게이션 */}
        <nav className="flex items-center space-x-12 text-sm font-medium">
          <button className="text-purple-600">About</button>
          <button onClick={() => navigate("/calendar")} className="text-gray-600 hover:text-purple-600">
            Calendar
          </button>
          <button onClick={() => navigate("/workout")} className="text-gray-600 hover:text-purple-600">
            Workout
          </button>
          <button onClick={() => navigate("/stats")} className="text-gray-600 hover:text-purple-600">
            Stats
          </button>
        </nav>

        {/* 로그인 / 시작 */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup/restricted")}
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700"
          >
            Get started
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex flex-col items-center text-center px-6 py-16">
        {/* 타이틀 */}
        <h2 className="text-4xl font-medium text-gray-800 leading-snug">
          감정 기반 헬스케어,{" "}
          <span className="italic font-bold">Emodia</span>
          <br />
          하루 <span className="font-bold">1분</span>, 나의 패턴을 이해해요
        </h2>
        <p className="text-lg text-gray-500 mt-4">
          이모지로 감정을 남기고, 루틴을 체크하면 주간 인사이트로 연결됩니다.  
          작은 기록이 쌓여 더 나은 컨디션으로 안내해요.
        </p>

        {/* 버튼 */}
        <div className="flex space-x-4 mt-8">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-xl text-base font-medium hover:bg-purple-700">
            더보기
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-50"
          >
            로그인
          </button>
        </div>

        {/* 카드 */}
        <div className="grid grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
          <div className="bg-white rounded-2xl shadow p-6 h-64 flex flex-col justify-between">
            <div>
              <p className="text-2xl">😊</p>
              <h3 className="text-lg font-semibold mt-4">감정·몸상태 기록</h3>
              <p className="text-sm text-gray-500 mt-2">이모지/간단 메모로 하루 1분이면 충분해요</p>
            </div>
            <button className="text-sm text-purple-600 font-medium">자세히 보기</button>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-64 flex flex-col justify-between">
            <div>
              <p className="text-2xl">🧘</p>
              <h3 className="text-lg font-semibold mt-4">맞춤 루틴 제안</h3>
              <p className="text-sm text-gray-500 mt-2">스트레칭·호흡 루틴을 체크하고 리마인드</p>
            </div>
            <button className="text-sm text-purple-600 font-medium">자세히 보기</button>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-64 flex flex-col justify-between">
            <div>
              <p className="text-2xl">📊</p>
              <h3 className="text-lg font-semibold mt-4">주간 인사이트</h3>
              <p className="text-sm text-gray-500 mt-2">기분/습관 패턴을 한눈에 시각화</p>
            </div>
            <button className="text-sm text-purple-600 font-medium">자세히 보기</button>
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 w-full flex justify-end">
          <button
            onClick={() => navigate("/about2")}
            className="px-8 py-4 bg-purple-600 text-white rounded-xl text-base font-semibold hover:bg-purple-700"
          >
            무료로 시작하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default About1;
