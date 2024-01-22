import React from 'react';
import {AppMain} from'./styles';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";
import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";

function App() {
  return (
    <AppMain>
      <Routes>
          <Route path={"/"} element={<LoginPage/>}/>
          <Route path={"/main"} element={<Feed/>}/>
          <Route path={"/profile"} element={<UserProfile/>}/>
      </Routes>
        
    </AppMain>
  );
}

export default App;
