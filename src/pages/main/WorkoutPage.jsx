import React from "react";

const workouts = [
  { title: "목 어깨 스트레칭 5분", level: "난이도: 초급 · 스트레칭 연습" },
  { title: "요가 플로우 10분", level: "난이도: 중급 · 전신 스트레칭" },
  { title: "전신 스트레칭 15분", level: "난이도: 상급 · 몸통 유연" },
  { title: "수영 밸런스 8분", level: "난이도: 초급 · 깊은 휴식" },
  { title: "코어 집중 7분", level: "난이도: 중급 · 복근" },
  { title: "상체 운동 15분", level: "난이도: 상급 · 상체 스트레칭" },
];

export const Workout = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center">
      {/* 네비게이션 */}
      <div className="w-full flex justify-between items-center px-16 py-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300"></div>
          <span className="text-gray-800 font-medium">Emodia</span>
        </div>
        <nav className="flex gap-12 text-lg">
          <a href="#" className="text-gray-900">About</a>
          <a href="#" className="text-gray-900">Calendar</a>
          <a href="#" className="text-indigo-500 font-bold">Workout</a>
          <a href="#" className="text-gray-900">Stats</a>
        </nav>
        <button className="bg-black text-white text-xs font-bold italic px-4 py-2 rounded-full">
          Get started
        </button>
      </div>

      {/* 헤더 */}
      <header className="w-full max-w-6xl mt-12 mb-6 px-4">
        <h1 className="text-4xl font-bold italic text-gray-900">Workout</h1>
        <p className="text-sm text-zinc-600 mt-2">
          검색해서 원하는 운동을 빠르게 찾아보세요
        </p>
      </header>

      {/* 검색 & 필터 */}
      <div className="w-full max-w-6xl flex flex-col gap-4 px-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="예: 요가, 하체, 20분"
            className="flex-1 border rounded-lg px-4 py-2 text-sm"
          />
          <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg">
            검색
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          {/* 난이도 */}
          <div className="flex gap-2 items-center">
            <span className="text-gray-500">난이도</span>
            <button className="px-3 py-1 border rounded-full">초급</button>
            <button className="px-3 py-1 border rounded-full">중급</button>
            <button className="px-3 py-1 border rounded-full">상급</button>
          </div>
          {/* 소요시간 */}
          <div className="flex gap-2 items-center">
            <span className="text-gray-500">소요시간</span>
            <button className="px-3 py-1 border rounded-full">5분</button>
            <button className="px-3 py-1 border rounded-full">10분</button>
            <button className="px-3 py-1 border rounded-full bg-indigo-500 text-white">
              15분
            </button>
            <button className="px-3 py-1 border rounded-full">20분</button>
          </div>
          {/* 부위 */}
          <div className="flex gap-2 items-center">
            <span className="text-gray-500">부위</span>
            <button className="px-3 py-1 border rounded-full">전신</button>
            <button className="px-3 py-1 border rounded-full">상체</button>
            <button className="px-3 py-1 border rounded-full">하체</button>
            <button className="px-3 py-1 border rounded-full">코어</button>
          </div>
        </div>
      </div>

      {/* 결과 카드 */}
      <div className="w-full max-w-6xl grid grid-cols-3 gap-6 mt-10 px-4">
        {workouts.map((w, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 bg-gradient-to-br from-purple-100 to-indigo-100"
          >
            <h3 className="text-base font-semibold mb-2">{w.title}</h3>
            <p className="text-xs text-gray-600">{w.level}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-10 mb-20">
        <button className="px-8 py-2 bg-indigo-500 text-white rounded-lg">
          다음
        </button>
      </div>
    </div>
  );
};
 