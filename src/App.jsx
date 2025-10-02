// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Intro (단일 페이지로 통합)
import IntroPage from "./pages/main/IntroPage";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SignUpRestricted from "./pages/auth/SignUpRestricted";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Main
import MainPage from "./pages/main/MainPage";
import AboutPage from "./pages/main/AboutPage";   // ✅ 새로 합친 AboutPage.jsx
import CalendarPage from "./pages/main/CalendarPage";
import { Workout } from "./pages/main/WorkoutPage";
import StatsPage from "./pages/main/StatsPage";

// ✅ 새로 합친 StartPage.jsx
import StartPage from "./pages/main/StartPage";

function App() {
  return (
    <Routes>
      {/* Intro */}
      <Route path="/intro" element={<IntroPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/restricted" element={<SignUpRestricted />} /> {/* ✅ 경로 통일 */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Main */}
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />   {/* ✅ 통합 페이지 */}

      {/* Calendar */}
      <Route path="/calendar" element={<CalendarPage />} /> 
      {/* CalendarDayDetail, CalendarNewRecord는 모달 팝업에서 처리 → 제거 */}

      {/* Workout & Stats */}
      <Route path="/workout" element={<Workout />} />
      <Route path="/stats" element={<StatsPage />} />

      {/* StartPage */}
      <Route path="/start" element={<StartPage />} />
    </Routes>
  );
}

export default App;
