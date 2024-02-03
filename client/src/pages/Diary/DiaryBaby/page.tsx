import React, {useEffect, useState} from "react";
import {fetchDiary} from "@/apis/diary/DiaryAPI";
import {DiaryResponseProps} from "@/components/type/types";

const DiaryBabyPage = () => {
    const [diaryList, setDiaryList] = useState<DiaryResponseProps[]>([]);
    useEffect(() => {
        fetchDiary(101).then((data) => {
            setDiaryList(data);

        }).catch((error) => {
            console.error(error);
        })
    }, []);

    return (<div className="w-[100%] h-[100%]">

    </div>);
}

export default DiaryBabyPage;
