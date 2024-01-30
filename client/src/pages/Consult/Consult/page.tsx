import React from "react";
import {Link} from 'react-router-dom'

import {
    AvailableSection,
    BackgroundBox,
    ContentBox,
    DoctorSection,
    HistoryBox,
    ProfileLayout,
    ReserveSection,
    ConsultSection,
} from "./styles"
import sample1 from "@/assets/images/sample1.jpg"
import {ProfileComponent} from "@/components/Profile";
import ConsultRegist from "@/pages/Consult/ConsultRegist/page";

const ConsultPage = () => {
    return (
        <ProfileLayout>
            <BackgroundBox src={sample1}/>
            <ContentBox>
                <DoctorSection>
                    <ProfileComponent name="오은영" intro="아동심리학과"/>
                </DoctorSection>
                <ConsultSection>
                    <AvailableSection>
                        <p className="mb-3 text-base font-bold">현재 상담 가능</p>
                        <p className="mb-1 text-base font-bold">상담 가능 시간</p>
                        <p>09:00 - 18:00</p>
                        <p>토, 일 공휴일 휴무</p>
                    </AvailableSection>
                    <ReserveSection>

                        <Link to="write"><button className="btn btn-primary w-[80%] mb-3">지금 상담하기</button></Link>
                        <button className="btn btn-primary w-[80%]">진료 예약</button>

                    </ReserveSection>
                </ConsultSection>
            </ContentBox>

            <HistoryBox>
                <div className="p-3 rounded-tr-[10px] rounded-tl-[10px]"
                     style={{boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)"}}>
                    <p className="mb-3">약력</p>
                    <p>서울대학교</p>
                    <p>...</p>
                    <p>...</p>
                    <p>...</p>

                </div>

            </HistoryBox>
        </ProfileLayout>)
        ;
}

export default ConsultPage;
