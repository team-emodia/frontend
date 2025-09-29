import React from "react";
// import { Card } from "../components/Card"; // TODO
// import { Copy } from "../components/Copy"; // TODO
// import vector2,3… (나중에 연결)

export const Intro5 = () => {
  return (
    <div className="bg-white w-full min-w-[1440px] h-[900px] relative flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-6">마지막 단계!</h2>
      <p className="text-gray-500">루틴과 기록을 설정하고 시작하세요</p>
      <button className="bg-black text-white px-6 py-2 mt-6 rounded">다음</button>
    </div>
  );
};
