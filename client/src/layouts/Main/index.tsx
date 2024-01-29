import React from 'react';
import {MainLayout,BodySection,NaviSection} from './styles';
import {Routes, Route} from 'react-router-dom';

import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";
import {Header,Write, Navigation} from "@/components/Menu";
import ConsultApplicant from "@/pages/Doctor/Applicant/ConsultApplicant";
import './index.css';
import DiaryMomPage from "@/pages/Diary/DiaryMom/page";
import WritePage from "@/pages/Diary/DiaryWrite/page";
import ChatBarComponent from "@/components/ChatBar";
import DirectMessagePage from "@/pages/DirectMessage/DirectMessageDetail/page";
import DirectMessageList from "@/pages/DirectMessage/DirectMessageList/page";
import UserRegist from "@/pages/UserRegist/UserRegist";



function Main() {
    const currentPath = window.location.pathname;

    // 만약 현재 경로에 write가 포함되어 있다면 Header숨김
    const isWriteEndpoint = currentPath.includes('write');
    const isMessageEndPoint = currentPath.includes('room');
    return (
        <MainLayout>
            <BodySection className="scrollBar">
                {!isWriteEndpoint && <Header />}
                {(isWriteEndpoint && currentPath.includes('mom')) && <Write title={"산모일기"}/>}
                {(isWriteEndpoint && currentPath.includes('baby')) && <Write title={"육아일기"}/>}
                {(isWriteEndpoint && currentPath.includes('board')) && <Write title={"피드"}/>}
                <Routes>
                    <Route path={"/join"} element={<UserRegist/>}/>
                    <Route path={"/"} element={<Feed/>}/>
                    <Route path={"/profile"} element={<UserProfile/>}/>
                    <Route path={"/diary/:diaryType"} element={<DiaryMomPage/>}/>
                    <Route path="/diary/:diaryType/write" element={<WritePage/>} />
                    <Route path={"/message"} element={<DirectMessageList/>}/>
                    <Route path={"/message/room"} element={<DirectMessagePage/>}/>
                    <Route path={"/consult"} element={<ConsultApplicant/>}/>

                </Routes>
            </BodySection>
            <NaviSection>
                {!isMessageEndPoint && <Navigation/>}
                {isMessageEndPoint && <ChatBarComponent/>}

            </NaviSection>
        </MainLayout>
    );
}

export default Main;
