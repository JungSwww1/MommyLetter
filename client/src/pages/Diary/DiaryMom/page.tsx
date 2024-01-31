import React,{useEffect} from "react";

import {DiaryHeader} from "@/components/Diary";
import DiaryListComponent from "@/components/DiaryList";
import {fetchDiary} from '@/apis/diary/DiaryAPI';
const DiaryMomPage = () => {
    // useEffect(() => {
    // fetchDiary(101)
    // }, []);

    return (<div className="w-[100%] h-[100%]">
        <DiaryHeader/>
        <div className="flex justify-center items-center w-[100%] h-[50%]">
            <div className="flex justify-center items-center bg-gray-400 w-[80%] h-[100%]">캘린더</div>
        </div>
        <DiaryListComponent date='2024.01.01' createdTime='13:23' isUpdate={false} feeling='path-to-feeling-icon'
                            content='오늘은 고승민이란 남편이 너무나도 귀찮게 굴어서 화가 났다. 제발 아무것도 안하고 숨만 쉬고 살아도 좋을텐데 왜 저렇게 까부는지 모르겠다...'
                            pictures={['path-to-image1', 'path-to-image2']}/>

    </div>);
}

export default DiaryMomPage;
