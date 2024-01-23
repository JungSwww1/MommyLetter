import React from 'react';
import {AppMain,AppBody,AppNavi} from'./styles';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";
import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";
import {Index, Navigation} from "@/components/Menu";

function App() {
  return (
    <AppMain>
        <AppBody>
            <Index/>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}/>
                <Route path={"/main"} element={<Feed/>}/>
                <Route path={"/profile"} element={<UserProfile/>}/>
            </Routes>
        </AppBody>
        <AppNavi>
            <Navigation/>
        </AppNavi>
    </AppMain>
  );
}

export default App;
