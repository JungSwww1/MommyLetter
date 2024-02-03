import React from 'react';
import {MainLayout,BodySection} from './styles';
import {Routes, Route} from 'react-router-dom';

import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";
import {Header,Write, Navigation} from "@/components/Menu";
import './index.css';
import DiaryMomPage from "@/pages/Diary/DiaryMom/page";
import ChatBarComponent from "@/components/ChatBar";
import DirectMessagePage from "@/pages/DirectMessage/DirectMessageDetail/page";
import DirectMessageList from "@/pages/DirectMessage/DirectMessageList/page";
import UserRegist from "@/pages/UserRegist/UserRegist";
import SearchPage from "@/pages/Search/page";
import ConsultListPage from "@/pages/Consult/ConsultList/page";
import ConsultPage from "@/pages/Consult/Consult/page";
import HistoryPage from "@/pages/History/History/page";
import HistoryListPage from "@/pages/History/HistoryList/page";
import ConsultRegist from "@/pages/Consult/ConsultRegist/page";
import UserEdit from "@/pages/UserEdit/UserEdit";
import DiaryPage from "@/pages/Diary/page";



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
                    {/*유저관련 라우터*/}
                    <Route path={"/join"} element={<UserRegist/>}/>
                    <Route path={"/edit"} element={<UserEdit/>}/>
                    <Route path={"/profile"} element={<UserProfile/>}/>

                    {/*피드관련 라우터*/}
                    <Route path={"/"} element={<Feed/>}/>

                    {/*다이어리관련 라우터*/}
                    <Route path={"/diary/*"} element={<DiaryPage/>}/>

                    {/*DM관련 라우터*/}
                    <Route path={"/message"} element={<DirectMessageList/>}/>
                    <Route path={"/message/room"} element={<DirectMessagePage/>}/>

                    {/*검색관련 라우터*/}
                    <Route path={"/search/*"} element={<SearchPage/>}/>

                    {/*상담관련 라우터*/}
                    <Route path={"/consult"} element={<ConsultListPage/>}/>
                    <Route path={"/consult/:id/"} element={<ConsultPage/>}/>
                    <Route path={"/consult/:id/write"} element={<ConsultRegist/>}/>

                    {/*기록관련 라우터*/}
                    <Route path={"/history"} element={<HistoryListPage/>}/>
                    <Route path={"/history/:id"} element={<HistoryPage/>}/>


                    {/*접근관련 라우터*/}
                    <Route path={"/*"} element=""/>

                </Routes>
            </BodySection>
        </MainLayout>
    );
}

export default Main;
