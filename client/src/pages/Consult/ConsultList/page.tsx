import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import DoctorListCardComponent from "@/components/DoctorListCard";

import {ReadDoctorList} from "@/apis/profile/ProfileAPI";
import {DoctorProfileProps} from "@/pages/type/types";

const ConsultListPage = () => {
    const [doctorList, setDoctorList] = useState<DoctorProfileProps[]>()
    const [displayedDoctorList, setDisplayedDoctorList] = useState<DoctorProfileProps[]>()
    const [departments, setDepartments] = useState<string[]>([])
    useEffect(() => {
        ReadDoctorList().then((response) => {
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
            <details className="dropdown duration-300">
                <summary className="m-1 rounded-full ">상담하기</summary>
                <ul className="p-2 shadow menu dropdown-content duration-300 z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </details>
            <select className="select select-bordered rounded-full" onChange={selectDepartment}>
                <option>선택</option>
                {departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                ))}
            </select>
        </div>
        <section className="h-[30%]">
            {displayedDoctorList?.map((doctor: DoctorProfileProps, index) => (
                <Link to={doctor.doctorId.toString()} key={index}>
                    <button className="w-[100%] hover:bg-gray-200 hover:rounded-lg active:scale-90 duration-300">
                        <DoctorListCardComponent
                            name={doctor.name}
                            department={doctor.department}
                            img={`${doctor.profilePhoto ? "/userimages/" + doctor.profilePhoto.substring(72,) : "/assets/images/default_image_doctor.png"}`}
                            date=""
                        />
                    </button>
                </Link>))}
        </section>
    </div>);
};

export default ConsultListPage;