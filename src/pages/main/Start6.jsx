import React, { useState } from 'react';

const Start6 = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [voiceOfMind, setVoiceOfMind] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 font-sans text-gray-800 relative overflow-hidden">
      <div className="absolute top-5 left-5 font-bold text-2xl text-gray-600">Emodia</div>

      <div className="text-center" style={{ marginTop: '-150px' }}>
        <h1 className="text-4xl mb-2.5 font-bold text-gray-700">오늘도 고생하셨어요!</h1>
        <p className="text-lg text-gray-500 mb-10">힘들고 지친 몸과 마음, 조금은 나아졌나요?</p>

        <div className="flex gap-5 mb-8 justify-center">
          <button
            onClick={() => setSelectedMood('만족스러웠어요')}
            className={`py-4 px-8 border border-gray-300 rounded-full text-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 ${
              selectedMood === '만족스러웠어요' ? 'bg-cyan-50 shadow-md' : 'bg-white'
            }`}
          >
            만족스러웠어요 👍
          </button>
          <button
            onClick={() => setSelectedMood('별로였어요')}
            className={`py-4 px-8 border border-gray-300 rounded-full text-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 ${
              selectedMood === '별로였어요' ? 'bg-cyan-50 shadow-md' : 'bg-white'
            }`}
          >
            별로였어요 👎
          </button>
        </div>

        <div className="flex items-center gap-2.5 mb-5">
          <input
            type="text"
            placeholder="마음의 소리함"
            value={voiceOfMind}
            onChange={(e) => setVoiceOfMind(e.target.value)}
            className="py-3 px-5 w-96 border border-gray-300 rounded-full text-base transition-colors focus:outline-none focus:border-purple-700"
          />
          <button className="py-3 px-6 bg-indigo-500 text-white border-none rounded-full text-base font-bold cursor-pointer transition-colors hover:bg-indigo-600">
            오늘의 감정 기록하기
          </button>
        </div>
      </div>

      <div className="flex gap-5 mt-12">
        <button className="py-2.5 px-5 border border-gray-300 rounded-2xl bg-white text-sm cursor-pointer transition-all hover:bg-gray-100">
          캘린더로 이동
        </button>
        <button className="py-2.5 px-5 border border-gray-300 rounded-2xl bg-white text-sm cursor-pointer transition-all hover:bg-gray-100">
          홈으로 이동
        </button>
      </div>

      <p className="text-xs text-gray-400 absolute bottom-5 right-5">
        Tip: 기록을 남기면 내게 더 정확한 추천을 받아요
      </p>
    </div>
  );
};

export default Start6;

 