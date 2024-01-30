import React from 'react';
import {Link} from 'react-router-dom'
import {DoctorListSection, HistoryListLayout} from "@/pages/History/HistoryList/styles";
import DoctorListCardComponent from "@/components/DoctorListCard";
import sample from "@/assets/images/sample2.jpg"
const HistoryListPage = () => {
    return (
        <HistoryListLayout>
            <DoctorListSection>
                <Link to="1"><DoctorListCardComponent name="오은영" gender="여성" department="가정의학" img={sample} date="23.01.02"/></Link>
                <Link to="2"><DoctorListCardComponent name="오은영" gender="여성" department="가정의학" img={sample} date="23.01.02"/></Link>
            </DoctorListSection>
        </HistoryListLayout>);
};

export default HistoryListPage;