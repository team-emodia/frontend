import React from "react";

const Start1 = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-purple-100 to-blue-100">
      {/* 상단 로고 */}
      <header className="flex items-center p-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center"></div>
        <span className="ml-2 font-medium text-gray-700">Emodia</span>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Ready to start with Emodia?
        </h1>
        <button className="px-8 py-3 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">
          START
        </button>
      </main>
    </div>
  );
};

export default Start1;
 