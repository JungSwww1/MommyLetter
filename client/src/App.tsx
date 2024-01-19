import React from 'react';
import {AppMain} from'./styles';
import {Routes, Route} from 'react-router-dom';

import LoginPage from "@/pages/LoginPage/LoginPage";
import UserRegist from "@/pages/UserRegist/UserRegist";
import UserProfile from "@/pages/Profile/UserProfile";
import UserEdit from "@/pages/UserEdit/UserEdit";
function App() {
  return (
    <AppMain>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<UserRegist />} />
        {/* 차후에 userId에 관한 것 추가*/}
        <Route path="/profiles/{userId}" element={<UserProfile />} />
        <Route path="/editProfiles/{userId}"  element={<UserEdit/>}/>
      </Routes>
    </AppMain>
  );
}

export default App;
