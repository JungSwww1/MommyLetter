import React from 'react';
import {AppMain} from'./styles';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import UserRegist from "@/pages/UserRegist";
function App() {
  return (
    <AppMain>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/auth/signup" element={<UserRegist/>}/>
      </Routes>
    </AppMain>
  );
}

export default App;
