import React from "react";
import actions from "../assets/main/actions.svg";
import image2 from "../assets/main/image-2.png";
import image from "../assets/main/image.svg";
import subtract from "../assets/main/subtract.svg";
import vector from "../assets/main/vector.svg";

export const MainPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full relative z-20">
        <div className="relative w-full">
          <img
            className="w-full h-auto"
            alt="Vector background"
            src={vector}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <img
                className="w-8 h-8 sm:w-10 sm:h-10"
                alt="Logo"
                src={image}
              />
              <div className="font-bold italic text-gray-900 text-xl sm:text-2xl [font-family:'Inter-BoldItalic',Helvetica]">
                Emodia
              </div>
            </div>
            <div className="flex">
              <img
                className="h-8"
                alt="Actions"
                src={actions}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-48">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Background"
            src={image2}
          />
        </div>

        {/* Emodia Title */}
        <div className="relative z-10 text-center">
          <h1 className="[font-family:'Inter-BoldItalic',Helvetica] font-bold italic text-[#f4effef5] text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-normal">
            Emodia
          </h1>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 mt-8 sm:mt-12 md:mt-16 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
          <div className="flex justify-between items-center text-white font-extrabold text-sm sm:text-base [font-family:'DM_Sans-ExtraBold',Helvetica]">
            <a href="#" className="whitespace-nowrap hover:text-gray-300">About</a>
            <a href="#" className="whitespace-nowrap hover:text-gray-300">Calendar</a>
            <a href="#" className="transition-opacity hover:opacity-75">
              <img
                  className="h-6 w-auto"
                  alt="Subtract"
                  src={subtract}
              />
            </a>
            <a href="#" className="whitespace-nowrap hover:text-gray-300">Workout</a>
            <a href="#" className="whitespace-nowrap hover:text-gray-300">Stats</a>
          </div>
        </nav>
      </main>
    </div>
  );
};