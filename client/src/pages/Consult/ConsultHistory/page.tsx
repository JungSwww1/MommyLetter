import React from 'react';
import {ProfileComponent} from "@/components/Profile";
import {BackgroundSection,ProfileSection,DoctorListSection, ConsultHistoryLayout} from "@/pages/Consult/ConsultHistory/styles";
import DoctorListCardComponent from "@/components/DoctorListCard";
import sample1 from "@/assets/images/sample1.jpg"
const ConsultHistoryPage = () => {
    return (
        <ConsultHistoryLayout>
            <BackgroundSection>
                <img src={sample1}/>
            </BackgroundSection>

            <ProfileSection>
                <ProfileComponent/>
            </ProfileSection>

            <DoctorListSection>
                <DoctorListCardComponent name="오은영" gender="여성" department="가정의학" img={sample1} date="23.01.02"/>
            </DoctorListSection>
        </ConsultHistoryLayout>);
};

export default ConsultHistoryPage;