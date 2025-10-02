import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoEmodia from "../../assets/logo/logo-emodia.svg";

// ✅ DB API
import { EmotionAPI } from "../../api";
import WeeklyMoodChart from "../../components/WeeklyMoodChart";

const Header = () => {
  const navigate = useNavigate();
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
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/calendar")}>Calendar</button>
        <button onClick={() => navigate("/workout")}>Workout</button>
        <button className="font-bold text-indigo-500">Stats</button>
      </nav>
    </header>
  );
};

const StatsPage = () => {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  // ✅ 최근 7일 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EmotionAPI.getEmotions();
        const recent = data.slice(-7); // 최근 7일
        setLabels(recent.map((item) => item.date.slice(5))); // ex. "09-26"
        setDataPoints(recent.map((item) => item.score || 60));
      } catch (err) {
        console.error("Stats 데이터 불러오기 실패:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <Header />
      <main className="w-full max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold italic mb-4">Stats</h1>
        <WeeklyMoodChart labels={labels} dataPoints={dataPoints} />
      </main>
    </div>
  );
};

export default StatsPage;
