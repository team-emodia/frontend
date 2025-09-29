import React from "react";
// 받은 이미지 기준으로 연결
import image from "../assets/main/image.svg";
import image2 from "../assets/main/image-2.png";
// TODO: actions.svg, subtract.svg, vector.svg → 추가 필요

const MainPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img src={image} alt="메인 로고" className="mx-auto mb-4 w-32" />
        <h1 className="text-3xl font-bold">Main Page</h1>
        <p className="text-gray-600">여기는 Emodia의 메인 페이지입니다.</p>
        <img src={image2} alt="메인 배경" className="mx-auto mt-6 w-64" />
      </div>
    </div>
  );
};

export default MainPage;
