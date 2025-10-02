// src/components/WeeklyMoodChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Chart.js에 사용할 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeeklyMoodChart = () => {
  // ✅ 더미 데이터 (추후 API 연동 가능)
  const labels = ["9/22", "9/23", "9/24", "9/25", "9/26", "9/27", "9/28"];
  const data = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: [60, 55, 70, 58, 64, 72, 66], // 점수 기반 예시
        borderColor: "rgba(99, 102, 241, 1)", // indigo-500
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.4)"); // indigo-400
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)"); // 하단 연한색
          return gradient;
        },
        fill: true, // ✅ 배경 채우기
        tension: 0.4, // ✅ 곡선 부드럽게
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 제거
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X축 그리드 제거
        },
        ticks: {
          color: "#6b7280", // text-gray-500
        },
      },
      y: {
        min: 40,
        max: 80,
        ticks: {
          stepSize: 10,
          color: "#6b7280",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)", // gray-300 투명
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyMoodChart;
