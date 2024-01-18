import React from "react";
import { AppMain } from "./styles";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import UserRegist from "@/pages/UserRegist";
import UserProfile from "@/pages/UserProfile";
function App() {
  return (
    <AppMain>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<UserRegist />} />
        {/* 차후에 userId에 관한 것 추가*/}
        <Route path="/profiles/{userId}" element={<UserProfile />} />
      </Routes>
    </AppMain>
  );
}

export default App;
