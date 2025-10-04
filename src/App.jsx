import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SignUpRestricted from "./pages/auth/SignUpRestricted";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Main
import MainPage from "./pages/main/MainPage";
import IntroPage from "./pages/main/IntroPage";
import AboutPage from "./pages/main/AboutPage";
import CalendarPage from "./pages/main/CalendarPage";
import WorkoutPage from "./pages/main/WorkoutPage";
import WorkoutDetailPage from "./pages/main/WorkoutDetailPage";
import StatsPage from "./pages/main/StatsPage";
import StartPage from "./pages/main/StartPage";
import MyPage from "./pages/main/MyPage";

function App() {
  return (
    <Routes>
      {/* 인증 관련 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup-restricted" element={<SignUpRestricted />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 메인/소개/캘린더/운동/통계/인트로/스타트/마이페이지 */}
      <Route path="/main" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/workout" element={<WorkoutPage />} />
      <Route path="/workout/detail/:id" element={<WorkoutDetailPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/mypage" element={<MyPage />} />

      {/* 기본 루트 → 메인 페이지 */}
      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  );
}

export default App;
