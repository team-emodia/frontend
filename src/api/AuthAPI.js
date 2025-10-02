import axios from "axios";

const AUTH_BASE_URL = "http://127.0.0.1:8000/users";

// 토큰 관리
export const getAccessToken = () => localStorage.getItem("access");
export const setTokens = (access, refresh) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};
export const removeTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// 로그인
export const login = async (email, password) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login/`, {
    email,
    password,
  });
  const { access, refresh } = response.data;
  setTokens(access, refresh);
  return response.data;
};

// 회원가입
export const signup = async (username, email, password, password2) => {
  const response = await axios.post(`${AUTH_BASE_URL}/register/`, {
    username,
    email,
    password,
    password2,
  });
  const { access, refresh } = response.data;
  setTokens(access, refresh);
  return response.data;
};

// 로그아웃 (서버 X, 클라이언트만)
export const logout = () => {
  removeTokens();
};
