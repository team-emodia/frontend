import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('스트레칭');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">지친 하루였군요. 지금은 몸과 마음을 풀어볼 시간이에요</h1>
        <p className="text-lg text-gray-500 mb-8">오늘의 감정과 최근 기록을 바탕으로 맞춤 스트레칭을 준비했어요</p>

        <div className="flex justify-center items-center space-x-4 mb-8 text-gray-600">
          <div className="flex items-center space-x-2">
            <span>오늘의 감정:</span>
            <span className="font-semibold">지침 😥</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>선택한 목표:</span>
            <span className="font-semibold">긴장 완화</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>소요시간:</span>
            <span className="font-semibold">10분</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => setActiveTab('스트레칭')}
            style={{ backgroundColor: activeTab === '스트레칭' ? '#6366F1' : '' }}
            className={`py-2 px-6 rounded-full text-lg font-medium transition-colors duration-300 ${
              activeTab === '스트레칭' ? 'text-white' : 'text-gray-500'
            }`}
          >
            스트레칭
          </button>
          <button
            onClick={() => setActiveTab('호흡')}
            className={`py-2 px-6 rounded-full text-lg font-medium transition-colors duration-300 ${
              activeTab === '호흡' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'
            }`}
          >
            호흡
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Stretching Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">추천</span>
              <span className="text-sm text-gray-500">5분 · 초급</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">목 아파 스트레칭</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-500"></span>
              <button className="text-purple-600 font-semibold">자세 보기</button>
            </div>
          </div>

          {/* Stretching Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">부드러움</span>
              <span className="text-sm text-gray-500">10분 · 중급</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">허리·골반 스트레칭</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-500"></span>
              <button className="text-purple-600 font-semibold">자세 보기</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Why is this recommended? Section */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 text-left">
            <h4 className="text-lg font-bold text-gray-800 mb-2">왜 이 추천인가요?</h4>
            <p className="text-sm text-gray-600">
              최근 7일 중 4일 '지침/우울' 기록 + 근육 부근 통증 → 긴장 완화 스트레칭 우선 제공

              기준: 감정 패턴 · 신체 메모 · 선호 시간대
            </p>
          </div>

          {/* Add Breathing Routine Section */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 text-left">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-bold text-gray-800">호흡 루틴도 함께 해볼까요?</h4>
              <button className="py-1 px-3 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100">추가하기</button>
            </div>
            <p className="text-sm text-gray-600">4-7-8 호흡 3분 · 이완 효과</p>
          </div>
        </div>

        <div className="flex justify-end items-center space-x-4">
          <button className="text-gray-500 font-semibold">다른 추천 보기</button>
          <button
            style={{ backgroundColor: '#6366F1' }}
            className="py-3 px-8 text-white font-bold rounded-full transition-colors duration-300 hover:bg-indigo-600"
          >
            바로 시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
 