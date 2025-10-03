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
import StatsPage from "./pages/main/StatsPage";
import StartPage from "./pages/main/StartPage";

function App() {
  return (
    <Routes>
      {/* 인증 관련 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup-restricted" element={<SignUpRestricted />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 메인/소개/캘린더/운동/통계/인트로/스타트 */}
      <Route path="/main" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/workout" element={<WorkoutPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/start" element={<StartPage />} />

      {/* 기본 루트 → 로그인 페이지 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
