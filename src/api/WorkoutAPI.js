// src/api/WorkoutAPI.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * ✅ 운동 기록 저장
 * @param {Object} data - { date, workout }
 */
export const saveWorkoutRecord = async (data) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.post(`${API_BASE_URL}/workouts/`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 운동 기록 저장 실패:", error);
    throw error;
  }
};

// 나중에 필요할 수 있는 다른 함수도 이 패턴으로 추가 가능
// ex) fetchWorkoutRecords, updateWorkoutRecord, deleteWorkoutRecord

// ✅ eslint 경고 방지: default export는 변수에 담아 내보내기
const WorkoutAPI = {
  saveWorkoutRecord,
};

export default WorkoutAPI;
