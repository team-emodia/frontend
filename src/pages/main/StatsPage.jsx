import React, { useEffect, useState } from "react";

// ✅ 공통 Header
import Header from "../../common/Header";

// ✅ DB API
import { EmotionAPI } from "../../api";
import WeeklyMoodChart from "../../components/WeeklyMoodChart";

const StatsPage = () => {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  // ✅ 오늘 기준 최근 7일 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EmotionAPI.getEmotions();
        console.log("감정 데이터:", data); // 디버깅용

        // 오늘 날짜 기준으로 최근 7일 날짜 배열 생성
        const today = new Date();
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          last7Days.push(date.toISOString().split('T')[0]); // YYYY-MM-DD 형식
        }

        // 날짜별 감정 데이터 매핑
        const dataMap = {};
        data.forEach(item => {
          dataMap[item.date] = item.emotion_score;
        });

        // 최근 7일 레이블 및 데이터 생성
        const chartLabels = last7Days.map(dateStr => {
          const date = new Date(dateStr);
          return `${date.getMonth() + 1}/${date.getDate()}`; // ex. "10/4"
        });

        const chartData = last7Days.map(dateStr => {
          // 0~7점을 0~100점으로 환산 (7점 만점 → 100점 만점)
          if (dataMap[dateStr] !== undefined) {
            return Math.round((dataMap[dateStr] / 7) * 100);
          }
          return null;
        });

        setLabels(chartLabels);
        setDataPoints(chartData);
      } catch (err) {
        console.error("Stats 데이터 불러오기 실패:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <Header variant="default" />
      <main className="w-full max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold italic mb-4">Stats</h1>
        <WeeklyMoodChart labels={labels} dataPoints={dataPoints} />
      </main>
    </div>
  );
};

export default StatsPage;
