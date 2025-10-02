// src/api/AuthAPI.js
import axios from "axios";

const AUTH_BASE_URL = "http://127.0.0.1:8000/users";

// 토큰 관리
export const getAccessToken = () => localStorage.getItem("authToken");
export const setTokens = (access, refresh) => {
  localStorage.setItem("authToken", access);
  if (refresh) localStorage.setItem("refreshToken", refresh);
};
export const removeTokens = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

// 인증 관련 API
export const login = async (email, password) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login/`, {
    email,
    password,
  });
  const { access, refresh } = response.data;
  setTokens(access, refresh);
  return response.data;
};

export const signup = async (email, password, username) => {
  const response = await axios.post(`${AUTH_BASE_URL}/signup/`, {
    email,
    password,
    username,
  });
  return response.data;
};

export const logout = async () => {
  try {
    await axios.post(`${AUTH_BASE_URL}/logout/`, {}, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
  } catch (err) {
    console.warn("서버 로그아웃 실패 (무시 가능):", err);
  }
  removeTokens();
};

// (백엔드 준비 후) 프로필 조회
export const getProfile = async () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const response = await axios.get(`${AUTH_BASE_URL}/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("프로필 불러오기 실패:", err);
    return null;
  }
};

// ✅ default export 추가
export default {
  getAccessToken,
  setTokens,
  removeTokens,
  login,
  signup,
  logout,
  getProfile,
};
