import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'

import sample1 from "@/assets/images/basicbackground.png"
import {ProfileComponent} from "@/components/Profile";
import {createReservation} from "@/apis/consult/ConsultAPI";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {DoctorRes, ReservationReq} from "@/apis/type/types";
import {readPatientList} from "@/apis/Doctor/DoctorAPI";
import {readDoctorDetail} from "@/apis/profile/ProfileAPI";
import FullCalendar from "@fullcalendar/react";
import TodoCalendar from "@/components/ReactCalendar";
import CalendarComponent from "@/components/ReactCalendar";

const ConsultPage = () => {
    const navigate = useNavigate();
    const param = useParams()["id"];
    const [doctorId, setDoctorId] = useState<number>()
    const [userId, setUserId] = useState<number>()
    const [consultDetail, setConsultDetail] = useState<DoctorRes>()

    const [isValid, setIsValid] = useState<boolean>(false)
    useEffect(() => {
        if (param) {
            setDoctorId(Number(param));
            readDoctorDetail(Number(param)).then((response)=>{
                setConsultDetail(response);
            })
            setUserId(Number(MommyLetterWS.getInstance().getUserInfo().userId));

        }

    }, [param]);

    useEffect(() => {

    }, []);

    const goWriting = () => {

        if (1) return alert("이 부분 user_info 중복 시 에러남 ");
        navigate("write");
    }

    const goReservation =() => {
        setIsValid(!isValid);
    }

    return (

        <div className="flex flex-col h-[100%] w-[100%]">

            <img className="h-[30%]" src={sample1}/>
            <div className="relative top-[-10%] flex flex-col items-center h-[35%] w-[100%] ml-3">
                <div className=" flex flex-col items-center h-[50%] w-[100%] mb-5">
                    {consultDetail &&
                        <ProfileComponent
                            profilePhoto={`${consultDetail.profilePhoto ? "/profileimages/" + consultDetail.profilePhoto.substring(88,) : "/assets/images/default_image_doctor.png"}`}
                            name={consultDetail.name} intro={consultDetail.department}/>}
                </div>

                <section className="flex flex-row ml-5 h-[50%] w-[100%]">
                    <section className="w-[40%]">
                        <p className="mb-3 text-base font-bold">현재 상담 가능</p>
                        <p className="mb-1 text-base font-bold">상담 가능 시간</p>
                        <p>{consultDetail?.validTime}</p>

                    </section>
                    <section className="flex justify-center items-center text-center w-[60%]">

                        <button className="btn btn-primary w-[80%]" onClick={goReservation}>진료 예약</button>

                    </section>
                </section>

            </div>
            {userId && doctorId && isValid &&  <CalendarComponent doctorId={doctorId} userId={userId}/>}
            <div className="flex justify-end mr-5">



            </div>
            <div className="h-[35%] mt-3">
                <div className="p-3 rounded-tr-[10px] rounded-tl-[10px]"
                     style={{boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)"}}>
                    <p className="mb-3">약력</p>
                    {consultDetail?.historyList.map((history,index) =>
                        <p key={index}>{history}</p>)}

                </div>

            </div>
        </div>);
}

export default ConsultPage;
