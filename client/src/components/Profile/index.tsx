import React from "react";
import {
    ContentBox,
    ProfileSection,
} from "./styles"
import sample2 from "@/assets/images/sample2.jpg"

import {ProfileProps} from "@/components/type/types";

export const ProfileComponent = ({name,intro}:ProfileProps) => {
    return (
            <ContentBox>
                <ProfileSection>
                    <img className="rounded-[100%] h-[100%] aspect-[1]" src={sample2}/>
                    <p className="mb-3 font-bold">{name}</p>
                    <p className="text-xs">{intro}</p>
                </ProfileSection>
            </ContentBox>);
}
