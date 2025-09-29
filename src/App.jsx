import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// Intro pages
import { Intro1 } from "./pages/Intro1";
// import { Intro2 } from "./pages/Intro2";
// import { Intro3 } from "./pages/Intro3";
// import { Intro4 } from "./pages/Intro4";
// import { Intro5 } from "./pages/Intro5";

// 나중에 ForgotPassword, SignUpRestricted 필요하면 추가

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />

        {/* 로그인 & 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Intro pages */}
        <Route path="/intro1" element={<Intro1 />} />
        {/* <Route path="/intro2" element={<Intro2 />} /> */}
        {/* <Route path="/intro3" element={<Intro3 />} /> */}
        {/* <Route path="/intro4" element={<Intro4 />} /> */}
        {/* <Route path="/intro5" element={<Intro5 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
