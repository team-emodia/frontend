import React from "react";
import { Link, useParams } from "react-router-dom";
import buttonGradient from "../../assets/bg/button-gradient.svg";
import exercise1 from "../../assets/bg/exercise-bg-1.svg";
import exercise2 from "../../assets/bg/exercise-bg-2.svg";

// Emoji (실제 파일명과 맞춤)
import angry from "../../assets/emoji/emoji-angry.svg";
import anxious from "../../assets/emoji/emoji-anxious.svg";
import calm from "../../assets/emoji/emoji-calm.svg";
import happy from "../../assets/emoji/emoji-happy.svg";
import love from "../../assets/emoji/emoji-love.svg";
import neutral from "../../assets/emoji/emoji-neutral.svg";
import sad from "../../assets/emoji/emoji-sad.svg";
import tired from "../../assets/emoji/emoji-tired.svg";

function CalendarNewRecord() {
  const { day } = useParams();

  // 감정 배열
  const emotions = [
    { src: happy, label: "행복" },
    { src: love, label: "설렘" },
    { src: calm, label: "차분" },
    { src: neutral, label: "보통" },
    { src: angry, label: "분노" },
    { src: anxious, label: "불안" },
    { src: tired, label: "지침" },
    { src: sad, label: "우울" },
  ];

  return (
    <div className="min-w-[1440px] min-h-screen bg-white font-sans px-12 py-10">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">새 기록 추가</h1>
        <Link
          to={`/calendar/${day}`}
          className="px-5 py-2 border rounded-full text-sm"
        >
          ← 날짜로 돌아가기
        </Link>
      </div>

      {/* 2컬럼 */}
      <div className="grid grid-cols-12 gap-8">
        {/* 기본 정보 */}
        <section className="col-span-6 p-6 border rounded-2xl space-y-6">
          <p className="font-bold text-sm">기본 정보</p>
          <input
            type="time"
            className="border px-4 py-2 rounded-lg text-sm w-40"
            defaultValue="20:30"
          />
          <textarea
            className="border w-full h-24 rounded-lg p-3 text-sm"
            placeholder="오늘 무슨 일이 있었나요?"
          />
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 border rounded-full text-xs">업무</span>
            <span className="px-3 py-1 border rounded-full text-xs">수면</span>
            <span className="px-3 py-1 border rounded-full text-xs">스트레칭</span>
          </div>

          {/* 감정 선택 */}
          <div>
            <p className="font-bold text-sm mb-3">오늘의 감정</p>
            <div className="grid grid-cols-4 gap-4">
              {emotions.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex flex-col items-center space-y-1 focus:outline-none"
                >
                  <img
                    src={emoji.src}
                    alt={emoji.label}
                    className="inline-block w-12 h-12"
                  />
                  <span className="text-xs text-gray-600">{emoji.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 운동 */}
        <section className="col-span-6 p-6 border rounded-2xl space-y-6">
          <p className="font-bold text-sm">운동 추가 (선택)</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="예: 요가, 스트레칭"
              className="flex-1 border px-3 py-2 rounded-lg text-sm"
            />
            <button
              className="px-4 py-2 text-white rounded-lg"
              style={{
                backgroundImage: `url(${buttonGradient})`,
                backgroundSize: "cover",
              }}
            >
              검색
            </button>
          </div>
          <div className="flex gap-4">
            <img src={exercise1} alt="운동1" className="rounded-xl w-32 h-20" />
            <img src={exercise2} alt="운동2" className="rounded-xl w-32 h-20" />
          </div>
        </section>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end gap-4 mt-10">
        <button className="px-5 py-2 border rounded-lg text-sm">취소</button>
        <button className="px-5 py-2 border rounded-lg text-sm">
          저장 후 계속 추가
        </button>
        <button
          className="px-5 py-2 text-white rounded-lg text-sm"
          style={{
            backgroundImage: `url(${buttonGradient})`,
            backgroundSize: "cover",
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default CalendarNewRecord;
