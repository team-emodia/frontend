// src/pages/main/MyPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import ProfileAPI from "../../api/ProfileAPI";

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // 편집 상태
  const [editUsername, setEditUsername] = useState("");
  const [editMainGoal, setEditMainGoal] = useState("");
  const [editRoutineTime, setEditRoutineTime] = useState("");
  const [editRoutineDays, setEditRoutineDays] = useState([]);

  const goalOptions = [
    { label: "목·어깨 뭉침 완화", value: "relax" },
    { label: "수면의 질 개선", value: "sleep" },
    { label: "스트레스 관리", value: "stress" },
    { label: "꾸준한 기록 습관 만들기", value: "habit" },
    { label: "에너지 회복", value: "energy" },
  ];

  const allDays = ["월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await ProfileAPI.getProfile();
      console.log("프로필 데이터:", data);
      setProfile(data);

      // routine_days가 문자열이면 배열로 변환
      let routineDays = data.routine_days;
      if (typeof routineDays === 'string') {
        try {
          routineDays = JSON.parse(routineDays);
        } catch {
          routineDays = [];
        }
      }
      if (!Array.isArray(routineDays)) {
        routineDays = [];
      }

      // 편집 상태 초기화
      setEditUsername(data.username || "");
      setEditMainGoal(data.main_goal || "");
      setEditRoutineTime(data.routine_time ? data.routine_time.slice(0, 5) : "09:00");
      setEditRoutineDays(routineDays.length > 0 ? routineDays : ["월", "화", "수", "목", "금", "토", "일"]);
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await ProfileAPI.updateProfile({
        username: editUsername,
        main_goal: editMainGoal,
        routine_time: editRoutineTime + ":00",
        routine_days: editRoutineDays,
      });

      alert("프로필이 업데이트되었습니다!");
      setIsEditing(false);
      loadProfile();
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const toggleDay = (day) => {
    if (editRoutineDays.includes(day)) {
      setEditRoutineDays(editRoutineDays.filter(d => d !== day));
    } else {
      setEditRoutineDays([...editRoutineDays, day]);
    }
  };

  const getGoalLabel = (value) => {
    const goal = goalOptions.find(g => g.value === value);
    return goal ? goal.label : value;
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white">
        <Header variant="default" />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header variant="default" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Page</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 sm:px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition text-sm sm:text-base"
            >
              편집
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  loadProfile();
                }}
                className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 sm:px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition text-sm sm:text-base"
              >
                저장
              </button>
            </div>
          )}
        </div>

        {/* 프로필 정보 카드 */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl shadow-sm border p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 이메일 (읽기 전용) */}
          <div className="group">
            <label className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1 block">
              📧 이메일
            </label>
            <div className="bg-white rounded-xl p-3 shadow-sm border-2 border-purple-100">
              <p className="text-sm text-gray-800 font-medium break-words">{profile?.email || "이메일 없음"}</p>
            </div>
          </div>

          {/* 사용자명 */}
          <div className="group">
            <label className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1 block">
              👤 사용자명
            </label>
            <div className="bg-white rounded-xl p-3 shadow-sm border-2 border-purple-100">
              {isEditing ? (
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="사용자명을 입력하세요"
                />
              ) : (
                <p className="text-sm text-gray-800 font-medium">{profile?.username || "사용자명 없음"}</p>
              )}
            </div>
          </div>

          {/* 목표 */}
          <div className="group">
            <label className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1 block">
              🎯 주요 목표
            </label>
            <div className="bg-white rounded-xl p-3 shadow-sm border-2 border-purple-100">
              {isEditing ? (
                <select
                  value={editMainGoal}
                  onChange={(e) => setEditMainGoal(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">목표를 선택하세요</option>
                  {goalOptions.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-800 font-medium">
                  {profile?.main_goal ? getGoalLabel(profile.main_goal) : "목표 설정 안됨"}
                </p>
              )}
            </div>
          </div>

          {/* 루틴 시간 */}
          <div className="group">
            <label className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1 block">
              ⏰ 루틴 시간
            </label>
            <div className="bg-white rounded-xl p-3 shadow-sm border-2 border-purple-100">
              {isEditing ? (
                <input
                  type="time"
                  value={editRoutineTime}
                  onChange={(e) => setEditRoutineTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-medium text-base">
                  {profile?.routine_time ? profile.routine_time.slice(0, 5) : "시간 설정 안됨"}
                </p>
              )}
            </div>
          </div>

          {/* 루틴 요일 */}
          <div className="group">
            <label className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1 block">
              📅 루틴 요일
            </label>
            <div className="bg-white rounded-xl p-3 shadow-sm border-2 border-purple-100">
              {isEditing ? (
                <div className="flex flex-wrap gap-1.5">
                  {allDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all transform hover:scale-105 ${
                        editRoutineDays.includes(day)
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    let days = profile?.routine_days;
                    if (typeof days === 'string') {
                      try {
                        days = JSON.parse(days);
                      } catch {
                        days = [];
                      }
                    }
                    if (Array.isArray(days) && days.length > 0) {
                      return days.map(day => (
                        <span key={day} className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-xs font-bold shadow-md">
                          {day}
                        </span>
                      ));
                    }
                    return <p className="text-sm text-gray-500">요일 설정 안됨</p>;
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* 가입일 */}
          <div className="group">
            <label className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1 block">
              🗓️ 가입일
            </label>
            <div className="bg-white rounded-xl p-3 shadow-sm border-2 border-purple-100">
              <p className="text-sm text-gray-800 font-medium">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : "정보 없음"}
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* 추가 기능 버튼들 */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => navigate("/intro")}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm border border-indigo-500 text-indigo-500 rounded-full font-semibold hover:bg-indigo-50 transition"
          >
            초기 설정 다시하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
