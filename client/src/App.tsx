import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import UserRegist from "@/pages/UserRegist";
<<<<<<< Updated upstream
=======
import UserProfile from "@/pages/UserProfile";
>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
<<<<<<< Updated upstream
        <Route path="/auth/signup" element={<UserRegist/>}/>
=======
        <Route path="/signup" element={<UserRegist/>}/>  
        {/* userId에 관한 것은 차후에 추가예정 */}
        <Route path="/profiles/{userId}" element={<UserProfile/>}/>  
>>>>>>> Stashed changes
      </Routes>
    </div>
  );
}

export default App;
