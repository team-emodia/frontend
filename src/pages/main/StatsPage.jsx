import React from "react";
import { useNavigate } from "react-router-dom";

// ... (import 구문 등 다른 부분은 모두 동일합니다)
import chartImage from "../../assets/illustrations/weekly-chart-placeholder.svg";
import logoEmodia from "../../assets/logo/logo-emodia.svg";

const Header = () => {
  const navigate = useNavigate();

  // ✍️ 로그아웃 버튼 핸들러
  const handleLogout = () => {
    console.log("로그아웃 되었습니다."); // 실제 로그아웃 처리 자리
    navigate("/"); // 홈페이지로 이동
  };

  return (
    <header className="w-full flex justify-between items-center px-12 py-4 bg-white shadow-sm">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logoEmodia} alt="Emodia Logo" className="w-8 h-8" />
        <h1 className="text-xl italic font-semibold text-gray-800">Emodia</h1>
      </div>
      <nav className="flex space-x-10 items-center">
        <button
          onClick={() => navigate("/about")}
          className="text-base font-medium text-gray-600 hover:text-indigo-500"
        >
          About
        </button>
        <button
          onClick={() => navigate("/calendar")}
          className="text-base font-medium text-gray-600 hover:text-indigo-500"
        >
          Calendar
        </button>
        <button
          onClick={() => navigate("/workout")}
          className="text-base font-medium text-gray-600 hover:text-indigo-500"
        >
          Workout
        </button>
        <button
          onClick={() => navigate("/stats")}
          className="text-base font-bold text-indigo-500"
        >
          Stats
        </button>
      </nav>
      <div>
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-full border border-gray-400 text-sm text-gray-800 hover:bg-gray-100"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

const StatsPage = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <Header />
      <main className="w-full max-w-5xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold italic text-gray-800">Stats</h1>
          <p className="mt-2 text-sm text-zinc-600">
            일주일 감정 추이를 확인하고 간단한 코멘트를 받아보세요
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <div className="w-full flex justify-center">
            <img
              src={chartImage}
              alt="일주일 감정 추이 그래프 예시"
              className="w-11/12 h-auto"
            />
          </div>
          <div className="w-full mt-8 p-5 rounded-lg flex items-center space-x-4 bg-indigo-50">
            <span className="text-2xl font-bold text-indigo-500">↗</span>
            <p className="font-semibold text-indigo-700">
              잘하고 있어요! 긍정적인 감정이 늘어나고 있네요 ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;
