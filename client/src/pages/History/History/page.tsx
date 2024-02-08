import React, {useEffect, useState} from 'react';
import {BackPageSection, DoctorProfileSection, HistoryLayout} from "@/pages/History/History/styles";


import {ReactComponent as Left} from "@/assets/icons/chevron-left.svg"
import {useParams} from "react-router-dom";
import {fetchHistoryDetail} from "@/apis/history/HistoryAPI";
import {HistoryDetailProps} from "@/pages/type/types";
import DoctorListCard from "@/components/DoctorListCard";




const HistoryPage = () => {
    const param = useParams()
    const [historyDetail, setHistoryDetail] = useState<HistoryDetailProps>()
    useEffect(() => {
        console.log(param.id);
        fetchHistoryDetail(Number(param.id)).then((response) => {
            setHistoryDetail(response);
        })
    }, [param.id])
    console.log(historyDetail);
    return (<HistoryLayout>
        <BackPageSection>
            <Left/>
        </BackPageSection>
        <DoctorProfileSection>
            {historyDetail &&
                <DoctorListCard  date={historyDetail.location} img="/assets/images/seungwon.png"
                                name={historyDetail.doctorName} department={historyDetail.department}/>}
        </DoctorProfileSection>
        {historyDetail && <div
            className="flex flex-col w-[100%] h-[100%] p-3 rounded-tl-[20px] rounded-tr-[20px] bg-[#fffaf2]"
            style={{boxShadow: "0px -4px 4px 0 rgba(0,0,0,0.25)"}}>
            <div className="h-[20%]">
                <span className="font-bold mt-5 mb-3 text-pointColor">환자명</span>
                <p>{historyDetail.userName}</p>
            </div>
            <div className="h-[20%]">
                <span className="h-[20%] mb-3 font-bold text-pointColor">상담 시간</span>
                <p>{historyDetail.reserveDate.substring(2, 10)}</p>
            </div>
            <span className="font-bold text-pointColor">처방전</span>
            {historyDetail.prescriptionPath}

                <img src="/assets/images/처방전.png"/>
                <p className="text-blue-600">다운로드</p>
            
        </div>}

    </HistoryLayout>);
};

export default HistoryPage;