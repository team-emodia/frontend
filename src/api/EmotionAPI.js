// src/api/EmotionAPI.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * ✅ 감정 기록 저장
 * @param {Object} data - { date, emotion, exercises }
 */
export const saveEmotionRecord = async (data) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.post(`${API_BASE_URL}/emotions/`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 감정 기록 저장 실패:", error);
    throw error;
  }
};

/**
 * ✅ 감정 기록 조회
 * @param {Object} params - ex) { month: "2025-09" }
 */
export const fetchEmotionRecords = async (params = {}) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.get(`${API_BASE_URL}/emotions/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("❌ 감정 기록 조회 실패:", error);
    throw error;
  }
};

/**
 * ✅ 감정 기록 수정
 * @param {number|string} id - 수정할 기록 ID
 * @param {Object} data - 수정할 데이터
 */
export const updateEmotionRecord = async (id, data) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.put(`${API_BASE_URL}/emotions/${id}/`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 감정 기록 수정 실패:", error);
    throw error;
  }
};

/**
 * ✅ 감정 기록 삭제
 * @param {number|string} id - 삭제할 기록 ID
 */
export const deleteEmotionRecord = async (id) => {
  try {
    const token = localStorage.getItem("access");
    await axios.delete(`${API_BASE_URL}/emotions/${id}/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return true;
  } catch (error) {
    console.error("❌ 감정 기록 삭제 실패:", error);
    throw error;
  }
};

// ✅ eslint 경고 해결: default export는 객체를 변수에 담아 내보내기
const EmotionAPI = {
  saveEmotionRecord,
  fetchEmotionRecords,
  updateEmotionRecord,
  deleteEmotionRecord,
};

export default EmotionAPI;
