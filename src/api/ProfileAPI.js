// src/api/ProfileAPI.js
import axios from "axios";

const PROFILE_BASE_URL = "http://127.0.0.1:8000/profiles";

// 공통적으로 토큰 불러오기
const getAccessToken = () => localStorage.getItem("access");

// 프로필 조회
export const getProfile = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  try {
    const response = await axios.get(`${PROFILE_BASE_URL}/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 프로필 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 프로필 업데이트
export const updateProfile = async (data) => {
  const token = getAccessToken();
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  console.log("📤 ProfileAPI - 전송 데이터:", data);

  try {
    const response = await axios.patch(`${PROFILE_BASE_URL}/me/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ ProfileAPI - 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 프로필 업데이트 실패:", error.response?.data || error.message);
    throw error;
  }
};

// default export
const ProfileAPI = {
  getProfile,
  updateProfile,
};

export default ProfileAPI;
