import React from "react";
// import { Secondary } from "../components/Secondary"; // TODO
import img1 from "../assets/intro/55cf3b3c.png";
import img2 from "../assets/intro/8cacce6e.png";
// import vector3~8 등은 TODO

export const Intro3 = () => {
  return (
    <div className="bg-white w-full min-w-[1440px] h-[900px] relative">
      <h2 className="absolute top-[14%] left-[21%] text-[64px] font-bold">
        Emodia로 매일 달라지는 3가지
      </h2>

      {/* 카드 1 */}
      <div className="absolute top-[30%] left-[28%] w-[65%] h-[15%] bg-purple-100 rounded-2xl"></div>
      <h3 className="absolute top-[35%] left-[5%] text-4xl font-bold">
        📝 감정·몸상태 기록
      </h3>
      <img className="absolute top-[285px] left-[31%] h-24" alt="기록" src={img1} />
      <p className="absolute top-[36%] left-[43%] text-2xl italic">
        매일의 감정을 간단하게 기록하고 나만의 감정 패턴을 발견해보세요
      </p>

      {/* 카드 2 */}
      <div className="absolute top-[51%] left-[28%] w-[65%] h-[15%] bg-purple-100 rounded-2xl"></div>
      <h3 className="absolute top-[57%] left-[6%] text-4xl font-bold">
        🧘 맞춤 루틴 제안
      </h3>
      <img className="absolute top-[468px] left-[31%] h-[120px]" alt="루틴" src={img2} />
      <p className="absolute top-[58%] left-[43%] text-2xl italic">
        감정에 맞는 스트레칭 자세로 몸과 마음의 균형을 찾으세요
      </p>

      {/* 카드 3 */}
      <div className="absolute top-[73%] left-[28%] w-[65%] h-[15%] bg-purple-100 rounded-2xl"></div>
      <h3 className="absolute top-[79%] left-[6%] text-4xl font-bold">
        📊 주간 인사이트
      </h3>
      <p className="absolute top-[79%] left-[42%] text-2xl italic">
        시각화된 감정과 신체적 변화를 한눈에 파악하고 인사이트를 얻으세요
      </p>
    </div>
  );
};
