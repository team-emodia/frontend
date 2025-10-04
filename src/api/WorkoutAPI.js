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

/**
 * 운동 세션 시작
 * @param {number} sportsId - 스포츠 ID
 */
export const startWorkoutSession = async (sportsId) => {
  try {
    const token = localStorage.getItem("access");
    console.log('세션 시작 요청:', { sports: sportsId, token: token ? '있음' : '없음' });
    const response = await axios.post(
      `${API_BASE_URL}/workout/start/`,
      { sports: sportsId },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ 세션 시작 실패:", error);
    console.error("에러 상세:", JSON.stringify(error.response?.data, null, 2));
    console.error("Status:", error.response?.status);
    throw error;
  }
};

/**
 * 운동 세션 종료
 * @param {number} sessionId - 세션 ID
 */
export const endWorkoutSession = async (sessionId) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.patch(
      `${API_BASE_URL}/workout/${sessionId}/end/`,
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ 세션 종료 실패:", error);
    throw error;
  }
};

/**
 * 포즈 좌표 전송 + 피드백 받기
 * @param {number} sessionId - 세션 ID
 * @param {number} timestamp - 타임스탬프
 * @param {Array} keypoints - 포즈 키포인트 [{name, x, y, score}, ...]
 */
export const submitPoseFrame = async (sessionId, timestamp, keypoints) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.post(
      `${API_BASE_URL}/pose/submit/`,
      {
        session: sessionId,
        timestamp: timestamp,
        keypoints: keypoints,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ 포즈 전송 실패:", error);
    throw error;
  }
};

/**
 * 운동 세션 목록 조회
 */
export const getWorkoutSessions = async () => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.get(`${API_BASE_URL}/workout/sessions/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 세션 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * Sports 목록 및 비디오 조회
 */
export const fetchWorkoutVideos = async () => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.get(`${API_BASE_URL}/sports/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Workout 비디오 조회 실패:", error);
    throw error;
  }
};

/**
 * 영상 목록 조회 (필터링 가능)
 * @param {Object} filters - { difficulty, body_part, exercise_type, duration_min, duration_max }
 */
export const fetchVideos = async (filters = {}) => {
  try {
    const token = localStorage.getItem("access");
    const params = new URLSearchParams();

    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.body_part) params.append('body_part', filters.body_part);
    if (filters.exercise_type) params.append('exercise_type', filters.exercise_type);
    if (filters.duration_min) params.append('duration_min', filters.duration_min);
    if (filters.duration_max) params.append('duration_max', filters.duration_max);
    if (filters.ordering) params.append('ordering', filters.ordering);

    const url = `${API_BASE_URL}/videos/${params.toString() ? '?' + params.toString() : ''}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 영상 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 영상 상세 조회
 * @param {number} videoId - 영상 ID
 */
export const fetchVideoDetail = async (videoId) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.get(`${API_BASE_URL}/videos/${videoId}/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 영상 상세 조회 실패:", error);
    throw error;
  }
};

// ✅ eslint 경고 방지: default export는 변수에 담아 내보내기
const WorkoutAPI = {
  saveWorkoutRecord,
  startWorkoutSession,
  endWorkoutSession,
  submitPoseFrame,
  getWorkoutSessions,
  fetchWorkoutVideos,
  fetchVideos,
  fetchVideoDetail,
};

export default WorkoutAPI;
