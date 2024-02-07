import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ProfileComponent} from "@/components/Profile";
import {
    BackgroundSection,
    Button,
    ConsultListLayout,
    DoctorListSection,
    ProfileSection
} from "@/pages/Consult/ConsultList/styles";
import DoctorListCardComponent from "@/components/DoctorListCard";
import sample1 from "@/assets/images/sample1.jpg"
import sample2 from "@/assets/images/sample2.jpg"

import {ReadDoctorList} from "@/apis/profile/ProfileAPI";
import {DoctorProfileProps} from "@/pages/type/types";

const ConsultListPage = () => {
    const [doctorList, setDoctorList] = useState<DoctorProfileProps[]>()
    useEffect(() => {
        const result = ReadDoctorList().then((doctorList) => {
            setDoctorList(doctorList);
        })
    }, [])

    return (<ConsultListLayout>
        <BackgroundSection>
            <img src={sample1}/>
        </BackgroundSection>

        <ProfileSection>
            <ProfileComponent name="고승민" intro="고추장아빠(15개월)"/>
        </ProfileSection>

        <DoctorListSection>
            {doctorList?.map((doctor: DoctorProfileProps, index) => (
                <Link to={doctor.doctorId.toString()} key={index}>
                    <Button>
                        <DoctorListCardComponent
                            name={doctor.name}
                            gender="여성"
                            department={doctor.department}
                            img={doctor.profilePhoto}
                            date="23.01.02"
                        />
                    </Button>
                </Link>
            ))}
        </DoctorListSection>
    </ConsultListLayout>);
};

export default ConsultListPage;