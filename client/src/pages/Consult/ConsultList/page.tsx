import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import DoctorListCardComponent from "@/components/DoctorListCard";

import {readDoctorList} from "@/apis/profile/ProfileAPI";
import {DoctorProfileProps} from "@/pages/type/types";

const ConsultListPage = () => {
    const [doctorList, setDoctorList] = useState<DoctorProfileProps[]>()
    const [displayedDoctorList, setDisplayedDoctorList] = useState<DoctorProfileProps[]>()
    const [departments, setDepartments] = useState<string[]>([])
    useEffect(() => {
        readDoctorList().then((response) => {
            console.log(response);
            setDoctorList(response);
            const uniqueDepartments:Set<string> = new Set(response.map((doctor: DoctorProfileProps) => doctor.department));
            setDepartments(Array.from(uniqueDepartments));
            setDisplayedDoctorList(response);
        })
    }, [])

    const selectDepartment = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const department = event.target.value;
        if(!doctorList|| department==="선택") return;
        setDisplayedDoctorList(doctorList.filter((doctor)=>{return doctor.department==department}))
        console.log(displayedDoctorList);
    }

    return (<div className="flex flex-col h-[100%]">
        <div className="flex justify-between p-5">
                <div className="m-1 rounded-full ">상담하기</div>

        </div>
        <section className="h-[30%]">
            {displayedDoctorList?.map((doctor: DoctorProfileProps, index) => (
                <Link to={doctor.doctorId.toString()} key={index}>
                    <button className="w-[100%] hover:bg-gray-200 hover:rounded-lg active:scale-90 duration-300">
                        <DoctorListCardComponent
                            name={doctor.name}
                            department={doctor.department}
                            img={`${doctor.profilePhoto ? "/profileimages/" + doctor.profilePhoto.substring(72,) : "/assets/images/default_image_doctor.png"}`}
                            date=""
                        />
                    </button>
                </Link>))}
        </section>
    </div>);
};

export default ConsultListPage;