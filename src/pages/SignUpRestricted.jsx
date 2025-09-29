import React from "react";
import leftPanel from "../assets/signup/left-panel.png";

export const SignUpRestricted = () => {
  return (
    <div className="bg-signup w-full min-w-[1440px] h-[900px] relative">
      {/* 왼쪽 패널 */}
      <img
        className="absolute w-[44%] h-[68%] top-[15%] left-[8%]"
        alt="Left panel"
        src={leftPanel}
      />

      {/* 안내 메시지 */}
      <div className="absolute w-[30%] h-[40%] top-[30%] left-[60%] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-[#bf1313] mb-4">
          로그인 후 이용해주세요
        </h2>
        <p className="text-gray-600 mb-6">
          회원가입은 로그인한 사용자만 가능합니다.
        </p>
        <a
          href="/login"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg"
        >
          로그인 하러 가기
        </a>
      </div>
    </div>
  );
};
