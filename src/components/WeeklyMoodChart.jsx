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

const WeeklyMoodChart = ({ labels = [], dataPoints = [] }) => {
  const data = {
    labels: labels.length ? labels : ["-", "-", "-", "-", "-", "-", "-"],
    datasets: [
      {
        label: "Mood",
        data: dataPoints.length ? dataPoints : [null, null, null, null, null, null, null],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointBorderWidth: 2,
        spanGaps: true, // null 값이 있어도 선 연결
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const score = context.parsed.y;
            // 100점 기준 점수를 0~7점으로 역산하여 감정 이름 표시
            const emotionScore = Math.round((score / 100) * 7);
            const emotionNames = ['우울', '지침', '불안', '분노', '보통', '차분', '설렘', '행복'];
            return `${emotionNames[emotionScore] || '알 수 없음'}: ${score}`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 110,
        ticks: {
          stepSize: 20,
          callback: function(value) {
            // 100 이상은 표시하지 않음
            return value <= 100 ? value : '';
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyMoodChart;
