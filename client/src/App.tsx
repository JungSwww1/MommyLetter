import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
