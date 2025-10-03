// src/pages/main/AboutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 일러스트
import illustrationEmotion from "../../assets/illustrations/illustration-habit.svg";
import illustrationRoutine from "../../assets/illustrations/illustration-yoga.svg";
import illustrationInsight from "../../assets/illustrations/illustration-chart-weekly.svg";

// 공통 Header
import Header from "../../common/Header";

const AboutPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  // 카드 데이터
  const cards = [
    {
      id: 1,
      image: illustrationEmotion,
      title: "감정·몸상태 기록",
      desc: "하루 1분이면 충분해요",
      modalDesc:
        "매일의 감정을 기록하고 신체 상태를 함께 남겨 보세요.\n작은 기록이 쌓여 나만의 감정 패턴을 발견할 수 있습니다.\n감정을 시각화하면 스스로의 변화를 쉽게 인식할 수 있고,\n더 나은 하루로 나아가는 첫 걸음을 시작할 수 있습니다.",
    },
    {
      id: 2,
      image: illustrationRoutine,
      title: "맞춤 루틴 제안",
      desc: "스트레칭·호흡 습관",
      modalDesc:
        "나의 감정과 컨디션에 맞는 스트레칭과 호흡 루틴을 추천해 드립니다.\n짧은 시간으로도 신체적 긴장을 완화하고 마음의 안정을 찾을 수 있습니다.\n반복적인 루틴은 더 건강한 하루를 만드는 힘이 됩니다.",
    },
    {
      id: 3,
      image: illustrationInsight,
      title: "주간 인사이트",
      desc: "기분/루틴 패턴 시각화",
      modalDesc:
        "일주일 동안 기록한 감정과 루틴 데이터를 시각화하여 보여줍니다.\n내가 자주 느끼는 감정, 변화의 패턴, 그리고 루틴의 효과를 한눈에 확인하세요.\n작은 변화가 쌓여 더 나은 생활 습관으로 이어집니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ================= 상단바 ================= */}
      <Header />

      {/* ================= 메인 콘텐츠 ================= */}
      <main className="flex-1 flex flex-col items-center text-center px-6 py-16">
        <h2 className="text-4xl font-medium text-gray-800 leading-snug">
          감정 기반 헬스케어, <span className="italic font-bold">Emodia</span>
          <br />
          하루 <span className="font-bold">1분</span>, 나의 패턴을 이해해요
        </h2>
        <p className="text-lg text-gray-500 mt-4">
          이모지로 감정을 남기고, 루틴을 체크하면 주간 인사이트로 연결됩니다.
          <br />
          작은 기록이 쌓여 더 나은 컨디션으로 안내해요.
        </p>

        {/* 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-6xl">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow p-8 min-h-[300px] flex flex-col justify-between items-center cursor-pointer hover:shadow-lg transition"
              onClick={() => setOpenModal(card)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {card.desc}
              </p>
              <button className="mt-6 px-4 py-2 text-sm bg-gray-100 rounded-full text-purple-600 font-medium hover:bg-gray-200">
                자세히 보기
              </button>
            </div>
          ))}
        </div>


      </main>

      {/* ================= 모달 ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-12 w-[480px] relative shadow-lg">
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-lg font-bold text-gray-600 hover:text-gray-800"
              onClick={() => setOpenModal(null)}
            >
              ✕
            </button>

            {/* 모달 내용 */}
            <div className="flex flex-col items-center text-center">
              <img
                src={openModal.image}
                alt={openModal.title}
                className="w-32 h-32 mb-6 object-contain"
              />
              <h3 className="text-2xl font-bold mb-4">{openModal.title}</h3>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto">
                {openModal.modalDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
