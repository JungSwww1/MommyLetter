import React, {useEffect, useState} from 'react';
import {ReactComponent as Left} from "@/assets/icons/chevron-left.svg"
import {useNavigate, useParams} from "react-router-dom";
import {fetchHistoryDetail} from "@/apis/history/HistoryAPI";
import {HistoryDetailProps} from "@/pages/type/types";
import DoctorListCard from "@/components/DoctorListCard";
import {createPrescription, readPatientDetail} from "@/apis/Doctor/DoctorAPI";
import {PatientDetailRes} from "@/apis/type/types";
import {createDiary} from "@/apis/diary/DiaryAPI";
import {Toast} from "@/components/Toast/Toast";
import {Label} from "@/pages/Diary/DiaryWrite/styles";



const ReserveWritePage = () => {

    const param = Number(useParams()["reserveId"]);
    const [patient, setPatient] = useState<PatientDetailRes>()
    const [imgFiles, setImgFiles] = useState<File>();
    const [previews, setPreviews] = useState<string>();
    const navigate = useNavigate();
    useEffect(() => {
        if (!param) return;
        readPatientDetail(param).then((response) => {
            setPatient(response);

        })

    }, [param]);
    const saveImgFiles = async (e: any) => {
        const file: File | null = e.target.files[0];

        if (file) {
            setPreviews(URL.createObjectURL(file));
            setImgFiles(file);
        }
    };


    const writeBtn =()=> {
        const consultRequest = {
            userId: patient?.userId,
            reserveId: patient?.reserveId
        }
        const formData = new FormData();
        formData.append('consultRequest', new Blob([JSON.stringify(consultRequest)], {
            type: "application/json"
        }));
        if(imgFiles)
        formData.append('prescription', imgFiles);
        createPrescription(formData).then((response) => {

            Toast.success("작성되었습니다.");
            navigate(-2);

        })


    }

    return (<div className="flex flex-col h-[100%] w-[100%]">

        {/*<div className="h-[30%]">*/}
        {/*    {historyDetail &&*/}
        {/*        <DoctorListCard date={historyDetail.location} img="/assets/images/seungwon.png"*/}
        {/*                        name={historyDetail.doctorName} department={historyDetail.department}/>}*/}
        {/*</div>*/}
        <div
            className="flex flex-col w-[100%] h-[100%] p-3 rounded-tl-[20px] rounded-tr-[20px] bg-[#fffaf2]"
            style={{boxShadow: "0px -4px 4px 0 rgba(0,0,0,0.25)"}}
        >
            <div className="h-[20%]">
                <span className="font-bold mt-5 mb-3 text-pointColor">환자명</span>
                <p>{patient?.name}</p>
            </div>
            <div className="h-[20%]">
                <span className="h-[20%] mb-3 font-bold text-pointColor">상담 시간</span>
                <p>{patient?.reserveDate.substring(5, 10)} {patient?.reserveDate.substring(11, 16)}</p>
            </div>
            <span className="font-bold text-pointColor">처방전</span>


            <br/>
            <div className="">
                <input type="file" id="input-file"
                       className="signup-profileImg-input"
                       onChange={saveImgFiles}
                />
            </div>
            <button onClick={writeBtn} className="btn btn-primary">작성하기</button>
        </div>

    </div>);
};

export default ReserveWritePage;