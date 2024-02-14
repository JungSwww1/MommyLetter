import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {readPatientList} from "@/apis/Doctor/DoctorAPI";
import {PatientRes} from "@/apis/type/types";
import {DoctorProfileProps} from "@/pages/type/types";
import DoctorListCardComponent from "@/components/DoctorListCard";


const ReserveListPage = () => {
    const [doctorId, setDoctorId] = useState<number>() //API수정 시 바꿔야 할 내용
    const [userList, setUserList] = useState<PatientRes[]>([])
    const [displayedUserList, setDisplayedUserList] = useState<PatientRes[]>([])
    useEffect(() => {
        setDoctorId(6);
        if(!doctorId) return;
        readPatientList(doctorId).then((response)=>{
            setUserList(response);
            setDisplayedUserList(response);
        })
    }, [doctorId]);

    const [patientList, setPatientList] = useState<PatientRes[]>([])
    const selectDepartment = (event: React.ChangeEvent<HTMLSelectElement>) =>{

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

            </select>
        </div>
        <section className="h-[30%]">
            {displayedUserList?.map((user: PatientRes, index) => (
                <Link to={user.reserveId.toString()} key={index}>
                    <button className="w-[100%] hover:bg-gray-200 hover:rounded-lg active:scale-90 duration-300">
                        <DoctorListCardComponent
                            name={user.name}
                            department={user.status}
                            img={`${user.profilePhoto ? "/userimages/" + user.profilePhoto.substring(72,) : "/assets/images/default_image.png"}`}
                            date={user.reserveDate}
                        />
                    </button>
                </Link>))}
        </section>
    </div>);
};

export default ReserveListPage;