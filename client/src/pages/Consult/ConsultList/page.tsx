import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ProfileComponent} from "@/components/Profile";
import {
    BackgroundSection,
    ConsultListLayout,
    DoctorListSection,
    ProfileSection,
    Button
} from "@/pages/Consult/ConsultList/styles";
import DoctorListCardComponent from "@/components/DoctorListCard";
import sample1 from "@/assets/images/sample1.jpg"
import sample2 from "@/assets/images/sample2.jpg"

import {ReadDoctorList} from "@/apis/profile/ProfileAPI";


const ConsultListPage = () => {
    useEffect(()=>{
    console.log(ReadDoctorList);
    },[])
    return (
        <ConsultListLayout>
            <BackgroundSection>
                <img src={sample1}/>
            </BackgroundSection>

            <ProfileSection>
                <ProfileComponent name="고승민" intro="고추장아빠(15개월)"/>
            </ProfileSection>

            <DoctorListSection>
                <Link to="1"><Button><DoctorListCardComponent name="오은영" gender="여성" department="가정의학" img={sample2} date="23.01.02"/></Button></Link>
                <Link to="2"><Button><DoctorListCardComponent name="오은영" gender="여성" department="가정의학" img={sample2} date="23.01.02"/></Button></Link>

        </DoctorListSection>
</ConsultListLayout>)
    ;
};

export default ConsultListPage;