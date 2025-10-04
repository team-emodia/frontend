// src/components/EmotionRecorder.jsx
import React, { useState } from "react";

const EmotionRecorder = ({ onSave, onCancel, initialData = {}, showDetails = true }) => {
  const emojis = [
    { id: "happy", name: "행복", icon: "😊" },
    { id: "excited", name: "설렘", icon: "🥰" },
    { id: "calm", name: "차분", icon: "😌" },
    { id: "neutral", name: "보통", icon: "😐" },
    { id: "angry", name: "분노", icon: "😡" },
    { id: "anxious", name: "불안", icon: "😟" },
    { id: "tired", name: "지침", icon: "😩" },
    { id: "sad", name: "우울", icon: "😔" },
  ];

  const [selectedEmoji, setSelectedEmoji] = useState(initialData.selectedEmoji || "tired");
  const [intensity, setIntensity] = useState(initialData.intensity || 50);
  const [memo, setMemo] = useState(initialData.memo || "");
  const [selectedMemos, setSelectedMemos] = useState(initialData.selectedMemos || []);

  const toggleMemo = (memoItem) => {
    setSelectedMemos((prev) =>
      prev.includes(memoItem)
        ? prev.filter((item) => item !== memoItem)
        : [...prev, memoItem]
    );
  };

  const handleSave = () => {
    const selectedEmojiName = emojis.find(e => e.id === selectedEmoji)?.name || "";
    onSave({
      selectedEmoji: selectedEmoji, // 이제 id (영어)
      selectedEmojiName: selectedEmojiName, // 이름 (한글)
      intensity,
      memo,
      selectedMemos,
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">오늘 기분은 어떤가요?</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {emojis.map((e) => (
          <button
            key={e.name}
            onClick={() => setSelectedEmoji(e.id)}
            className={`flex flex-col items-center p-4 rounded-lg border ${
              selectedEmoji === e.id ? "bg-indigo-100" : "bg-white"
            }`}
          >
            <span className="text-3xl">{e.icon}</span>
            <span className="text-sm mt-2">{e.name}</span>
          </button>
        ))}
      </div>

      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 입력하세요"
        className="w-80 p-3 border rounded-lg mb-6"
      />

      {showDetails && (
        <>
          <label className="mb-2">강도: {intensity}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-64 mb-6"
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {["업무", "휴식", "가족", "운동", "수면", "식사"].map((item) => (
              <button
                key={item}
                onClick={() => toggleMemo(item)}
                className={`py-2 px-4 rounded-full border transition-colors ${
                  selectedMemos.includes(item)
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-4 mt-6">
        {onCancel && (
          <button
            onClick={onCancel}
            className="py-3 px-8 border rounded-full"
          >
            취소
          </button>
        )}
        <button
          onClick={handleSave}
          className="py-3 px-8 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-600"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EmotionRecorder;
