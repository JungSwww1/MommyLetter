import React from "react";
import {
    ContentBox,
    ProfileSection,
} from "./styles"
import sample2 from "@/assets/images/sample2.jpg"
export const ProfileComponent = () => {
    return (
            <ContentBox>
                <ProfileSection>
                    <img className="rounded-[100%] h-[100%] w-[30%]" src={sample2}/>
                    <p className="mb-3 font-bold">고승민</p>
                    <p className="text-xs">고추장 아빠(15개월)</p>
                </ProfileSection>
            </ContentBox>);
}
