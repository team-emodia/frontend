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
    // ✅ URL을 'save' 엔드포인트로 변경
    const response = await axios.post(`${API_BASE_URL}/emotions/save/`, data, {
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

// ✅ 기존 코드 호환용 별칭
export const getEmotions = fetchEmotionRecords;

// ✅ default export (객체 묶음)
const EmotionAPI = {
  saveEmotionRecord,
  fetchEmotionRecords,
  updateEmotionRecord,
  deleteEmotionRecord,
  getEmotions, // ✅ 포함
};

export default EmotionAPI;
