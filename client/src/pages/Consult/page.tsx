import React from 'react';
import {Route,Routes} from 'react-router-dom'
import ConsultApplicant from "@/pages/Doctor/Applicant/ConsultApplicant";
import ConsultHistoryPage from "@/pages/Consult/ConsultHistory/page";

const ConsultPage = () => {
    return (
        <div className="flex w-[100%] h-[100%]">
        <Routes>
            <Route path={"/detail"} element={<ConsultApplicant/>}/>
            <Route path={"/list"} element={<ConsultHistoryPage/>}/>
        </Routes>
        </div>
    );
};

export default ConsultPage;