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
        data: dataPoints.length ? dataPoints : [0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyMoodChart;
