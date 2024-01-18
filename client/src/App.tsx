import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import UserRegist from "@/pages/UserRegist";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/auth/signup" element={<UserRegist/>}/>
      </Routes>
    </div>
  );
}

export default App;
