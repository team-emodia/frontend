import React from "react";
// 받은 이미지
import bgFull from "../assets/login/bg-full.svg";
import leftPanel from "../assets/login/left_panel.png";
import wavve from "../assets/login/wavve.com.png";
// TODO: vector.svg, image.svg, pngwing-1.png, pngwing-2.png, vector-2~8.svg → 추가 필요

const LoginPage = () => {
  return (
    <div
      className="w-full h-screen flex"
      style={{ backgroundImage: `url(${bgFull})`, backgroundSize: "cover" }}
    >
      {/* 왼쪽 패널 */}
      <div className="flex-1 flex items-center justify-center">
        <img src={leftPanel} alt="로그인 패널" className="max-w-md" />
      </div>

      {/* 오른쪽 로그인 폼 */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          className="border px-4 py-2 mb-3 w-64 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border px-4 py-2 mb-3 w-64 rounded"
        />
        <button className="bg-purple-600 text-white px-6 py-2 rounded w-64">
          로그인
        </button>
        <a href="/forgot" className="text-sm text-gray-500 mt-3">
          비밀번호를 잊으셨나요?
        </a>
        <img src={wavve} alt="Wavve 소셜 로그인" className="mt-5 w-32" />
      </div>
    </div>
  );
};

export default LoginPage;
