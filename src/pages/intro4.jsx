import React from "react";
// import { Secondary } from "../components/Secondary"; // TODO
// import 여러 vector… (나중에 연결)

export const Intro4 = () => {
  return (
    <div className="bg-white w-full min-w-[1440px] h-[900px] relative">
      <h2 className="absolute top-[17%] left-[18%] text-[64px] font-bold">
        지금 가장 바꾸고 싶은 한 가지는?
      </h2>

      {/* 선택 박스 */}
      <div className="absolute top-[35%] left-[11%] w-[20%] h-[21%] bg-gray-200 rounded-2xl" />
      <div className="absolute top-[35%] left-[39%] w-[20%] h-[21%] bg-gray-200 rounded-2xl" />
      <div className="absolute top-[35%] left-[65%] w-[20%] h-[21%] bg-gray-200 rounded-2xl" />
      <p className="absolute top-[51%] left-[16%] text-xl">목·어깨 뭉침 완화</p>
      <p className="absolute top-[51%] left-[44%] text-xl">수면의 질 개선</p>
      <p className="absolute top-[51%] left-[70%] text-xl">스트레스 관리</p>
    </div>
  );
};
