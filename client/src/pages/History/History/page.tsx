import React from 'react';
import {ProfileComponent} from "@/components/Profile";
import {BackPageSection,DoctorProfileSection,ContextSection, HistoryLayout} from "@/pages/History/History/styles";


import {ReactComponent as Left} from "@/assets/icons/chevron-left.svg"
const HistoryPage= () => {
    return (
        <HistoryLayout>
            <BackPageSection>
                <Left/>
            </BackPageSection>
            <DoctorProfileSection>
                <ProfileComponent name="오은영" intro="아동심리학과"/>

            </DoctorProfileSection>

            <ContextSection>
                <span className="font-bold">환자명</span>
                <div className="w-[95%] h-[10%] rounded-full bg-gray-200"></div>
                <span className="font-bold">상담 시간</span>
                <div className="w-[95%] h-[20%] rounded-full bg-gray-200"></div>
                <span className="font-bold">처방전</span>
                <div className="w-[95%] h-[65%] rounded-[10%] bg-gray-200"></div>
                <p>원본 다운로드</p>
            </ContextSection>


        </HistoryLayout>);
};

export default HistoryPage;