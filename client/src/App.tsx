import React from 'react';
import {AppMain,AppBody,AppNavi} from'./styles';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";
import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";
import {Index, Navigation} from "@/components/Menu";
import ConsultApplicant from "@/pages/Doctor/Applicant/ConsultApplicant";
import {DM} from "@/pages/DirectMessage/page"
import UserRegist from "@/pages/UserRegist/UserRegist";

function App() {
  return (
    <AppMain>
        <AppBody>
            <Index/>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<UserRegist/>}/>
                <Route path={"/main"} element={<Feed/>}/>
                <Route path={"/profile"} element={<UserProfile/>}/>
                <Route path={"/consult"} element={<ConsultApplicant/>}/>
                <Route path={"/dm"} element={<DM/>}/>
            </Routes>
        </AppBody>
        <AppNavi>
            <Navigation/>
        </AppNavi>
    </AppMain>
  );
}

export default App;
