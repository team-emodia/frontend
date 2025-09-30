import React from "react";
import { Routes, Route } from "react-router-dom";

// Intro
import Intro1 from "./pages/intro/Intro1";
import Intro2 from "./pages/intro/Intro2";
import Intro3 from "./pages/intro/Intro3";
import Intro4 from "./pages/intro/Intro4";
import Intro5 from "./pages/intro/Intro5";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SignUpRestricted from "./pages/auth/SignUpRestricted";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Main
import MainPage from "./pages/main/MainPage";
import AboutPage from "./pages/main/AboutPage";
import CalendarPage from "./pages/main/CalendarPage";
import CalendarDayDetail from "./pages/main/CalendarDayDetail";
import CalendarNewRecord from "./pages/main/CalendarNewRecord";
import WorkoutPage from "./pages/main/WorkoutPage";
import StatsPage from "./pages/main/StatsPage";

function App() {
  return (
    <Routes>
      {/* Intro */}
      <Route path="/" element={<MainPage />} />
      <Route path="/intro1" element={<Intro1 />} />
      <Route path="/intro2" element={<Intro2 />} />
      <Route path="/intro3" element={<Intro3 />} />
      <Route path="/intro4" element={<Intro4 />} />
      <Route path="/intro5" element={<Intro5 />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/restricted" element={<SignUpRestricted />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Main */}
      <Route path="/main" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/calendar/day" element={<CalendarDayDetail />} />
      <Route path="/calendar/new" element={<CalendarNewRecord />} />
      <Route path="/workout" element={<WorkoutPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}

export default App;
