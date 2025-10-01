import React, { useState } from 'react';

const emojis = [
  { name: '행복', icon: '😊' },
  { name: '설렘', icon: '🥰' },
  { name: '차분', icon: '😌' },
  { name: '보통', icon: '😐' },
  { name: '분노', icon: '😡' },
  { name: '불안', icon: '😟' },
  { name: '지침', icon: '😩' },
  { name: '우울', icon: '😔' },
];

const Start2 = () => {
  const [selectedEmoji, setSelectedEmoji] = useState('지침');
  const [intensity, setIntensity] = useState(50);
  const [memo, setMemo] = useState('');
  const [selectedMemos, setSelectedMemos] = useState([]);

  const toggleMemo = (memoItem) => {
    setSelectedMemos(prev =>
      prev.includes(memoItem)
        ? prev.filter(item => item !== memoItem)
        : [...prev, memoItem]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">오늘 기분은 어땠나요?</h1>
        <p className="text-lg text-gray-500 mb-10">가장 가까운 이모지를 선택하고, 강도를 슬라이더로 조절해 주세요</p>

        <div className="grid grid-cols-4 gap-4 mb-12">
          {emojis.map((emoji) => (
            <div
              key={emoji.name}
              className={`
                flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer
                transition-all duration-200
                ${selectedEmoji === emoji.name ? 'border-indigo-500 shadow-md' : 'border-gray-200'}
              `}
              onClick={() => setSelectedEmoji(emoji.name)}
            >
              <div
                className={`
                  text-4xl p-2 rounded-full mb-2
                  ${selectedEmoji === emoji.name ? 'bg-purple-100' : 'bg-gray-100'}
                `}
              >
                {emoji.icon}
              </div>
              <span className="text-gray-700">{emoji.name}</span>
            </div>
          ))}
        </div>

        <div className="w-full px-4 mb-10">
          <div className="flex justify-between text-gray-500 text-sm mb-2">
            <span>약함</span>
            <span>매우 쌤</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${intensity}%, #e5e7eb ${intensity}%, #e5e7eb 100%)`
            }}
          />
        </div>

        <div className="w-full text-left">
          <label className="block text-gray-700 font-bold mb-2">메모</label>
          <input
            type="text"
            placeholder="짧게 남겨요. 오늘 무슨 일이 있었나요?"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {['업무', '휴식', '가족', '운동', '수면', '식사'].map(item => (
              <button
                key={item}
                onClick={() => toggleMemo(item)}
                className={`
                  py-2 px-4 rounded-full border transition-colors
                  ${selectedMemos.includes(item) ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-gray-100 text-gray-700 border-gray-300'}
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              className="py-3 px-8 bg-indigo-500 text-white font-bold rounded-full transition-colors duration-300 hover:bg-indigo-600"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start2;