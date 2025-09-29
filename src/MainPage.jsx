import React from "react";
import actions from "./assets/actions.svg";
import image2 from "./assets/image-2.png";

import subtract from "./assets/subtract.svg";


import vector2 from "./assets/vector2.svg";


export const MainPageHome = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-white">
      {/* Background Image */}
      <img
        className="absolute inset-0 object-cover w-full h-full"
        alt="Background"
        src={image2}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 flex items-center justify-between w-full h-20 px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10"
            alt="Logo"
            src={vector2}
          />
          <div className="font-bold italic text-gray-900 text-xl sm:text-2xl [font-family:'Inter-BoldItalic',Helvetica]">
            Emodia
          </div>
        </div>
        <div>
          <img
            className="w-auto h-8 mr-14 sm:h-10"
            alt="Actions"
            src={actions}
            style={{ position: 'relative', right: '10px' }}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center">
        {/* Emodia Title */}
        <div className="font-bold italic text-[#f4effef5] text-6xl sm:text-7xl md:text-8xl [font-family:'Inter-BoldItalic',Helvetica]">
          Emodia
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center justify-center gap-8 mt-8 sm:gap-12 md:gap-16">
          <a href="#" className="font-extrabold text-white text-sm sm:text-base [font-family:'DM_Sans-ExtraBold',Helvetica] whitespace-nowrap">
            About
          </a>
          <a href="#" className="font-extrabold text-white text-sm sm:text-base [font-family:'DM_Sans-ExtraBold',Helvetica] whitespace-nowrap">
            Calendar
          </a>
          <div className="relative">
            <img
              className="w-5 h-5 sm:w-6 sm:h-6"
              alt="Subtract"
              src={subtract}
            />
          </div>
          <a href="#" className="font-extrabold text-white text-sm sm:text-base [font-family:'DM_Sans-ExtraBold',Helvetica] whitespace-nowrap">
            Workout
          </a>
          <a href="#" className="font-extrabold text-white text-sm sm:text-base [font-family:'DM_Sans-ExtraBold',Helvetica] whitespace-nowrap">
            Stats
          </a>
        </nav>
      </div>
    </div>
  );
};
