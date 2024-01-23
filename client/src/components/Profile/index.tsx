import React from "react";
import {
    ContentBox,
    ProfileSection,
} from "./styles"
import sample2 from "@/assets/images/sample2.jpg"
export const ProfileComponent = () => {
    return (
            <ContentBox>
                <img className="rounded-[100%] h-[45%] w-[35%]" src={sample2}/>
                <ProfileSection>
                    <p className="mb-3 text-lg font-bold">고승민</p>
                    <p className="mb-1">서울대학교 병원</p>
                    <p>가정의학</p>
                </ProfileSection>
            </ContentBox>);
}
