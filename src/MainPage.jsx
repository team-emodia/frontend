import React from "react";
import image2 from "./assets/image-2.png";
import image from "./assets/image.svg";
import subtract from "./assets/subtract.svg";
import vector2 from "./assets/vector2.svg";
import vector3 from "./assets/vector3.svg";
import vector from "./assets/vector.svg";

export const MainPage = () => {
  return (
    <div className="flex flex-col h-[900px] items-start gap-2.5 relative overflow-hidden bg-white">
      <img
        className="relative w-[1540px] h-[1007px] mr-[-100.00px] aspect-[1.53]"
        alt="Image"
        src={image2}
      />

      <img
        className="absolute w-full h-[8.00%] top-0 left-0"
        alt="Vector"
        src={vector}
      />

      <div className="absolute w-[24.65%] h-[18.00%] top-[36.33%] left-[38.75%]">
        <div className="absolute w-[98.87%] h-full top-0 left-0 font-bold italic text-[#f4effef5] text-8xl leading-[normal]">
          Emodia
        </div>
      </div>

      <div className="absolute top-[489px] left-[291px] w-[893px] h-[25px]">
        <div className="absolute top-[3px] left-[845px] font-extrabold text-white text-base text-center">
          Stats
        </div>
        <div className="absolute top-px left-[643px] font-extrabold text-white text-base text-center">
          Workout
        </div>
        <div className="absolute top-px left-[197px] font-extrabold text-white text-base text-center">
          Calendar
        </div>
        <div className="absolute top-[3px] left-0 w-[70px] font-extrabold text-white text-base text-center">
          About
        </div>
        <img
          className="absolute w-[3.25%] h-[92.00%] top-0 left-[48.15%]"
          alt="Subtract"
          src={subtract}
        />
      </div>

      <div className="absolute w-[89.31%] h-[4.00%] top-[2.11%] left-[8.89%]">
        <div className="absolute w-[6.84%] h-[80.56%] top-[5.56%] left-0 font-bold italic text-gray-900 text-2xl">
          Emodia
        </div>
        <div className="absolute w-[15.86%] h-full top-0 left-[84.29%]">
          <img
            className="absolute w-[39.22%] h-full top-0 left-0"
            alt="Vector"
            src={image}
          />
          <div className="absolute w-[17.65%] h-[41.67%] top-[25.00%] left-[10.78%] font-extrabold italic text-white text-xs">
            Log in
          </div>
          <img
            className="absolute w-[53.92%] h-full top-0 left-[44.12%]"
            alt="Vector"
            src={vector2}
          />
          <div className="absolute w-[33.33%] h-[41.67%] top-[27.78%] left-[53.92%] font-extrabold italic text-white text-xs">
            Get started
          </div>
        </div>
      </div>

      <img
        className="absolute w-[2.22%] h-[3.56%] top-[2.33%] left-[5.35%]"
        alt="Vector"
        src={vector3}
      />
    </div>
  );
};
