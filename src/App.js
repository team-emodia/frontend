// src/App.js
import React, { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  const [page, setPage] = useState("main");

  return (
    <div className="App">
      <div className="flex gap-4 p-4">
        <button onClick={() => setPage("main")} className="px-4 py-2 bg-gray-200 rounded">Main</button>
        <button onClick={() => setPage("login")} className="px-4 py-2 bg-gray-200 rounded">Login</button>
        <button onClick={() => setPage("signup")} className="px-4 py-2 bg-gray-200 rounded">Sign Up</button>
      </div>

      {page === "main" && <MainPage />}
      {page === "login" && <LoginPage />}
      {page === "signup" && <SignUpPage />}
    </div>
  );
}

export default App;
