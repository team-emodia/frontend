import React from "react";
import chartIllustration from "../../assets/illustrations/illustration-chart-weekly.svg";

const StatsPage = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-8">
      <h2 className="text-3xl font-bold mb-6">주간 통계</h2>
      <img
        src={chartIllustration}
        alt="Weekly Chart"
        className="w-96 h-64 mb-6"
      />
      <p className="text-gray-600 text-center max-w-lg">
        지난 한 주 동안의 감정 변화를 차트로 확인하세요 📊
      </p>
    </div>
  );
};

export default StatsPage;
