import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoEmodia from "../../assets/logo/logo-emodia.svg";

const About2 = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  const cards = [
    {
      id: 1,
      icon: "😊",
      title: "감정·몸상태 기록",
      desc: "하루 1분이면 충분해요",
      modalDesc: "매일의 감정을 간단하게 기록하고 나만의 감정 패턴을 발견해보세요.",
    },
    {
      id: 2,
      icon: "🧘",
      title: "맞춤 루틴 제안",
      desc: "스트레칭·호흡 습관",
      modalDesc: "감정에 맞는 스트레칭 자세로 몸과 마음의 균형을 찾으세요.",
    },
    {
      id: 3,
      icon: "📊",
      title: "주간 인사이트",
      desc: "기분/루틴 패턴 시각화",
      modalDesc: "시각화된 감정과 신체적 변화를 한눈에 파악하고 인사이트를 얻으세요.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 네비게이션 */}
      <header className="w-full flex justify-between items-center px-12 py-6 border-b">
        {/* 로고 */}
        <div className="flex items-center space-x-3">
          <img src={logoEmodia} alt="Emodia Logo" className="w-10 h-10" />
          <h1 className="text-xl italic font-semibold text-gray-900">Emodia</h1>
        </div>

        {/* 네비게이션 */}
        <nav className="flex items-center space-x-12 text-sm font-medium">
          <button className="text-purple-600">About</button>
          <button onClick={() => navigate("/calendar")} className="text-gray-600 hover:text-purple-600">
            Calendar
          </button>
          <button onClick={() => navigate("/workout")} className="text-gray-600 hover:text-purple-600">
            Workout
          </button>
          <button onClick={() => navigate("/stats")} className="text-gray-600 hover:text-purple-600">
            Stats
          </button>
        </nav>

        {/* 로그인 / 시작 */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup/restricted")}
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700"
          >
            Get started
          </button>
        </div>
      </header>

      {/* 카드 리스트 */}
      <main className="flex flex-col items-center px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 italic">Emodia가 매일 바꿔줄 3가지를 소개합니다</h2>

        <div className="grid grid-cols-3 gap-8 w-full max-w-5xl">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow p-6 h-64 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
              onClick={() => setOpenModal(card)}
            >
              <div>
                <p className="text-2xl">{card.icon}</p>
                <h3 className="text-lg font-semibold mt-4">{card.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{card.desc}</p>
              </div>
              <button className="text-sm text-purple-600 font-medium">자세히 보기</button>
            </div>
          ))}
        </div>

        {/* 모달 */}
        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-purple-100 rounded-2xl p-8 w-full max-w-md relative">
              <button
                className="absolute top-4 right-4 text-lg font-bold text-gray-600 hover:text-gray-800"
                onClick={() => setOpenModal(null)}
              >
                ✕
              </button>
              <div className="flex items-center space-x-2">
                <p className="text-2xl">{openModal.icon}</p>
                <h3 className="text-lg font-bold">{openModal.title}</h3>
              </div>
              <p className="text-sm text-gray-700 mt-4 leading-relaxed">{openModal.modalDesc}</p>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="mt-16 w-full flex justify-end">
          <button
            onClick={() => navigate("/calendar")}
            className="px-8 py-4 bg-purple-600 text-white rounded-xl text-base font-semibold hover:bg-purple-700"
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default About2;
