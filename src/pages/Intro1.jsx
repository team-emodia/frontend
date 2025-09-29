import React from "react";
// import { Secondary } from "../components/Secondary"; // TODO
import image2 from "../assets/intro/image-2.png";

export const Intro1 = () => {
  return (
    <div className="overflow-hidden bg-white w-full min-w-[1440px] h-[900px] relative">
      <img
        className="absolute w-[109%] top-0 left-[-4%] h-[1027px]"
        alt="Image"
        src={image2}
      />
      <div className="absolute w-[70%] top-[35%] left-[17%] font-bold italic text-8xl text-[#f7f9ffd6]">
        Welcome to Emodia
      </div>
      <p className="absolute top-[50%] left-[13%] w-[73%] text-2xl font-semibold text-[#e3e8f2] text-center">
        매일 여러분의 감정 기록을 기반으로 추천된 스트레칭 동작으로, <br />
        몸과 마음을 풀어내어 삶의 질을 향상시킵니다
      </p>
      {/* <Secondary className="absolute bottom-[5%] right-[5%]" /> */}
    </div>
  );
};
