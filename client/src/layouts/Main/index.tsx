import React, { useEffect, useState } from 'react';
import { MainLayout, BodySection } from './styles';
import { Routes, Route } from 'react-router-dom';
import OtherProfile from "@/pages/Profile/Others/UserProfile"
import UserProfile from "@/pages/Profile/Myself/UserProfile";
import Feed from "@/pages/Feed/Feed";
import { Header, Write, Navigation } from "@/components/Menu";
import './index.css';
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
import ReserveListPage from "@/pages/Reserve/ReserveList/page";
import { MommyLetterWS } from "@/apis/ws/MommyLetterWS";
import {UserProps} from "@/pages/type/types";
import ReserveDetailPage from "@/pages/Reserve/ResultDetail/page";
import ReserveWritePage from "@/pages/Reserve/ReserveWrite/page";
import DiaryAnalysisPage from "@/pages/Diary/DiaryAnalysis/page";
import InvalidAccessPage from "@/pages/Common/InvalidAccessPage";
import ErrorPage from "@/pages/Common/ErrorPage";
import GoogleMap from "@/pages/Map/MapContainer";
import Kakao from "@/pages/Map/Kakao/Kakao.js";

function Main() {
    const currentPath = window.location.pathname;
    const userInstance = MommyLetterWS.getInstance().getUserInfo()
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
        const storedAuth = localStorage.getItem('Auth');
        if (storedAuth) {
            const parsedAuth: UserProps = JSON.parse(storedAuth);
            setUser(parsedAuth);
        }
    }, []);

    return (
        <MainLayout>
            <BodySection className="scrollBar">
                <Header />
                <Routes>
                    {/*유저관련 라우터*/}
                    <Route path={"/join"} element={<UserRegist />} />
                    <Route path={"/edit"} element={<UserEdit />} />
                    <Route path={"/profile"} element={<UserProfile />} />
                    <Route path={"/profile/:userId"} element={<OtherProfile />} />
                    <Route path={"/kakaomap"} element={<Kakao/>}/>
                    {/*<Route path={"/map"} element={<GoogleMap/>}/>*/}
                    {/*피드관련 라우터*/}
                    <Route path={"/"} element={<Feed />} />

                    {/*다이어리관련 라우터*/}
                    <Route path={"/:userId/diary/*"} element={<DiaryPage />}/>

                    {/*DM관련 라우터*/}
                    <Route path={"/message"} element={<DirectMessageList />} />
                    <Route path={"/message/:roomNumber"} element={<DirectMessagePage/>} />

                    <Route path={"/search/*"} element={<SearchPage />} />

                    {/*상담관련 라우터*/}
                    <Route path={"/consult"} element={<ConsultListPage />} />
                    <Route path={"/consultRegist"} element={<ConsultRegist />} />
                    <Route path={"/consult/:id/"} element={<ConsultPage />} />
                    <Route path={"/consult/:id/write"} element={<ConsultRegist />} />

                    {/*기록관련 라우터*/}
                    <Route path={"/history"} element={<HistoryListPage />} />
                    <Route path={"/history/:id"} element={<HistoryPage />} />

                    {/*의사 관련 라우터*/}
                    <Route path={"/reserve"} element={<ReserveListPage />} />
                    <Route path={"/reserve/:reserveId"} element={<ReserveDetailPage/>} />
                    <Route path={"/reserve/:reserveId/write"} element={<ReserveWritePage/>} />
                    {/*접근관련 라우터*/}
                    <Route path={"/notAccess"} element={<InvalidAccessPage/>}/>
                    <Route path={"/*"} element={<ErrorPage/>} />

                </Routes>
            </BodySection>
        </MainLayout>
    );
}

export default Main;