import React from "react";
import imgStretch from "../assets/intro/8cacce6e-f0c1-4ce5-9c28-e3e1f6fb14a1 1.png";
import imgMemo from "../assets/intro/55cf3b3c-bc3d-4b2b-acd8-d7203fc4ba46 1.png";
import image2 from "../assets/intro/image-2.png";
import image from "../assets/intro/image.svg";
import vector2 from "../assets/intro/vector-2.svg";
import vector3 from "../assets/intro/vector-3.svg";
import vector4 from "../assets/intro/vector-4.svg";
import vector5 from "../assets/intro/vector-5.svg";
import vector6 from "../assets/intro/vector-6.svg";
import vector7 from "../assets/intro/vector-7.svg";
import vector8 from "../assets/intro/vector-8.svg";
import vector9 from "../assets/intro/vector-9.svg";
import vector10 from "../assets/intro/vector-10.svg";
import vector11 from "../assets/intro/vector-11.svg";
import vector12 from "../assets/intro/vector-12.svg";
import vector13 from "../assets/intro/vector-13.svg";
import vector14 from "../assets/intro/vector-14.svg";

export const Intro2 = () => {
  return (
    <div className="bg-intro w-full min-w-[1440px] h-[900px] relative">
      {/* 인트로 2 페이지 내용 */}
      <img src={imgStretch} alt="스트레칭 일러스트" />
      <img src={imgMemo} alt="메모 일러스트" />
    </div>
  );
};
