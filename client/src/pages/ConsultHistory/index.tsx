import React from 'react';
import {ProfileComponent} from "@/components/Profile";
import {BackgroundSection,ProfileSection,DoctorListSection, ConsultHistoryLayout} from "@/pages/ConsultHistory/styles";
import {HistoryCardComponent} from "@/components/HistoryCard";
import sample1 from "@/assets/images/sample1.jpg"
const ConsultHistory = () => {
    return (
        <ConsultHistoryLayout>
            <BackgroundSection>
                <img src={sample1}/>
            </BackgroundSection>

            <ProfileSection>
                <ProfileComponent/>
            </ProfileSection>

            <DoctorListSection>
                <HistoryCardComponent/>
            </DoctorListSection>
        </ConsultHistoryLayout>);
};

export default ConsultHistory;