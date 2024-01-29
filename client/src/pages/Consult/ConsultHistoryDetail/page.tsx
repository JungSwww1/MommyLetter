import React from 'react';
import {ProfileComponent} from "@/components/Profile";
import {BackPageSection,DoctorProfileSection,ConsultContextSection, ConsultHistoryDetailLayout} from "@/pages/Consult/ConsultHistoryDetail/styles";


import {ReactComponent as Left} from "@/assets/icons/chevron-left.svg"
const ConsultHistoryDetailPage = () => {
    return (
        <ConsultHistoryDetailLayout>
            <BackPageSection>
                <Left/>
            </BackPageSection>
            <DoctorProfileSection>
                <ProfileComponent/>
            </DoctorProfileSection>

            <ConsultContextSection>
                <span className="font-bold">환자명</span>
                <div className="w-[95%] h-[10%] rounded-full bg-gray-200"></div>
                <span className="font-bold">상담 시간</span>
                <div className="w-[95%] h-[20%] rounded-full bg-gray-200"></div>
                <span className="font-bold">처방전</span>
                <div className="w-[95%] h-[65%] rounded-[10%] bg-gray-200"></div>
                <p>원본 다운로드</p>
            </ConsultContextSection>


        </ConsultHistoryDetailLayout>);
};

export default ConsultHistoryDetailPage;