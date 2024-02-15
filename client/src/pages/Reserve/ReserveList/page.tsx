import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {readPatientList} from "@/apis/Doctor/DoctorAPI";
import {PatientRes} from "@/apis/type/types";
import {DoctorProfileProps} from "@/pages/type/types";
import DoctorListCardComponent from "@/components/DoctorListCard";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {readDoctorDetailuser} from "@/apis/profile/ProfileAPI";


const ReserveListPage = () => {
    const [doctorId, setDoctorId] = useState<number>() //API수정 시 바꿔야 할 내용
    const [userList, setUserList] = useState<PatientRes[]>([])
    const [displayedUserList, setDisplayedUserList] = useState<PatientRes[]>([])

    useEffect(() => {

        readDoctorDetailuser(Number(MommyLetterWS.getInstance().getUserInfo().userId)).then((response)=>
        setDoctorId(response.doctorId));
        if(!doctorId) return;
        readPatientList(doctorId).then((response)=>{
            setUserList(response);
            console.log(response);
            setDisplayedUserList(response);
        })
    }, [doctorId]);
    console.log(userList);
    const [patientList, setPatientList] = useState<PatientRes[]>([])
    const selectDepartment = (event: React.ChangeEvent<HTMLSelectElement>) =>{

    }

    return (<div className="flex flex-col h-[100%]">
        <div className="flex justify-between p-5">
                <div className="font-bold text-pointColor m-1 rounded-full ">상담하기</div>

        </div>
        <section className="h-[30%]">
            {displayedUserList?.map((user: PatientRes, index) => (
                <Link to={user.reserveId.toString()} key={index}>
                    <button className="w-[100%] hover:bg-gray-200 hover:rounded-lg active:scale-90 duration-300">
                        <DoctorListCardComponent
                            name={user.name}
                            department={user.status}
                            img={`${user.profilePhoto ? "/profileimages/" + user.profilePhoto.substring(88,) : "/assets/images/default_image.png"}`}
                            date={user.reserveDate}
                        />
                    </button>
                </Link>))}
        </section>
    </div>);
};

export default ReserveListPage;