import React from 'react';
import {MainLayout,BodySection,NaviSection} from './styles';
import {Routes, Route} from 'react-router-dom';
import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";
import {Index, Navigation} from "@/components/Menu";
import ConsultApplicant from "@/pages/Doctor/Applicant/ConsultApplicant";
import './index.css';

function Main() {
    return (
        <MainLayout>
            <BodySection className="scrollBar">
                <Index/>
                <Routes>
                    <Route path={"/"} element={<Feed/>}/>
                    <Route path={"/profile"} element={<UserProfile/>}/>
                    <Route path={"/diary/*"} />
                    <Route path={"/consult"} element={<ConsultApplicant/>}/>
                </Routes>
            </BodySection>
            <NaviSection>
                <Navigation/>
            </NaviSection>
        </MainLayout>
    );
}

export default Main;
