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
import AboutPage from "./pages/main/AboutPage";
import CalendarPage from "./pages/main/CalendarPage";
import WorkoutPage from "./pages/main/WorkoutPage"; // ✅ default export
import StatsPage from "./pages/main/StatsPage";

// ✅ 새로 합친 StartPage.jsx
import StartPage from "./pages/main/StartPage";

function App() {
  return (
    <Routes>
      {/* Main → 기본 경로 */}
      <Route path="/" element={<MainPage />} />

      {/* Intro → 별도 경로 */}
      <Route path="/intro" element={<IntroPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup-restricted" element={<SignUpRestricted />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Main */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/workout" element={<WorkoutPage />} />
      <Route path="/stats" element={<StatsPage />} />

      {/* Start */}
      <Route path="/start" element={<StartPage />} />
    </Routes>
  );
}

export default App;
