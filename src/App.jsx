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
import About1 from "./pages/main/About1";
import About2 from "./pages/main/About2";
import CalendarPage from "./pages/main/CalendarPage";
import CalendarDayDetail from "./pages/main/CalendarDayDetail";
import CalendarNewRecord from "./pages/main/CalendarNewRecord";
import { Workout } from "./pages/main/WorkoutPage";
import StatsPage from "./pages/main/StatsPage";
import Start6 from "./pages/main/Start6";
import Start3 from "./pages/main/Start3";
import { Start4 } from "./pages/main/Start4";
import { Start5 } from "./pages/main/Start5";
import Start2 from "./pages/main/Start2";
import Start1 from "./pages/main/Start1";


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
      <Route path="/about" element={<About1 />} />
      <Route path="/about2" element={<About2 />} />

      {/* Calendar */}
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/calendar/:day" element={<CalendarDayDetail />} />
      <Route path="/calendar/:day/new" element={<CalendarNewRecord />} />

      {/* Workout & Stats */}
      <Route path="/workout" element={<Workout />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/start6" element={<Start6 />} />
      <Route path="/start3" element={<Start3 />} />
      <Route path="/start4" element={<Start4 />} />
      <Route path="/start5" element={<Start5 />} />
      <Route path="/start2" element={<Start2 />} />
      <Route path="/start1" element={<Start1 />} />
    </Routes>
  );  
}

export default App;
