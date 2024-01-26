import React from "react";
import {useParams} from 'react-router-dom';

import {DiaryHeader, DiaryWrite} from "@/components/Diary";
import DiaryListComponent from "@/components/DiaryList";


const WritePage = () => {

// API호출 WRITE 시 필요한 정보
    const {diaryType} = useParams();

    return (
        <div className="h-[100%]">
            <DiaryWrite/>

        </div>

    );
}


export default WritePage;
