import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'

import sample1 from "@/assets/images/sample1.jpg"
import {ProfileComponent} from "@/components/Profile";
import {createReservation} from "@/apis/consult/ConsultAPI";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {ReservationReq} from "@/apis/type/types";
import {readPatientList} from "@/apis/Doctor/DoctorAPI";

const ConsultPage = () => {
    const navigate = useNavigate();
    const param = useParams()["id"];
    const [doctorId, setDoctorId] = useState<number>()
    const [userId, setUserId] = useState<number>()

    const [isValid, setIsValid] = useState<boolean>(true)
    useEffect(() => {
        if (param) {
            setDoctorId(Number(param));
            setUserId(Number(MommyLetterWS.getInstance().getUserInfo().userId));
            readPatientList(Number(param)).then((response) => {
                console.log(response);
            })
        }

    }, [param]);
    useEffect(() => {

    }, []);
    const goReservation = () => {
        if (!userId || !doctorId) return;
        const data: ReservationReq = {
            doctorId: doctorId, reserveDate: new Date().toISOString(), userId: userId
        }
        createReservation(data)
        navigate(1);
    }

    const goWriting = () => {

        if (1) return alert("이 부분 user_info 중복 시 에러남 ");
        navigate("write");
    }
    return (<div className="flex flex-col h-[100%] w-[100%]">
        <img className="h-[30%]" src={sample1}/>
        <div className="relative top-[-10%] flex flex-col items-center h-[35%] w-[100%] ml-3">
            <div className=" flex flex-col items-center h-[50%] w-[100%] mb-5">
                <ProfileComponent profilePhoto={"/assets/images/default_image.png"} name="오은영" intro="아동심리학과"/>
            </div>
            <section className="flex flex-row ml-5 h-[50%] w-[100%]">
                <section className="w-[40%]">
                    <p className="mb-3 text-base font-bold">현재 상담 가능</p>
                    <p className="mb-1 text-base font-bold">상담 가능 시간</p>
                    <p>09:00 - 18:00</p>
                    <p>토, 일 공휴일 휴무</p>
                </section>
                <section className="text-center w-[60%]">

                    <button onClick={() => goWriting()} className="btn btn-primary w-[80%] mb-3">지금 상담하기</button>
                    <button onClick={() => goReservation()} className="btn btn-primary w-[80%]">진료 예약</button>

                </section>
            </section>
        </div>

        <div className="h-[35%] mt-3">
            <div className="p-3 rounded-tr-[10px] rounded-tl-[10px]"
                 style={{boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)"}}>
                <p className="mb-3">약력</p>
                <p>서울대학교</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>

            </div>

        </div>
    </div>);
}

export default ConsultPage;
