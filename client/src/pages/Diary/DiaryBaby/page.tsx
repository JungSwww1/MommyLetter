import React, {useEffect, useState} from "react";

import {DiaryHeader} from "@/components/Diary";
import DiaryListComponent from "@/components/DiaryList";
import {DiaryRequestProps} from "@/pages/type/types";
import {fetchDiary} from "@/apis/diary/DiaryAPI";

const DiaryBabyPage = () => {
    const [diaryList, setDiaryList] = useState<DiaryRequestProps[]>([]);
    useEffect(() => {
        fetchDiary(101).then((data) => {
            setDiaryList(data);

        }).catch((error) => {
            console.error(error);
        })
    }, []);

    return (<div className="w-[100%] h-[100%]">
        {diaryList
            .filter((diary) => diary.category === "Baby")
            .map((diary) => (
                <DiaryListComponent
                    key={diary.diaryId}
                    content={diary.content}
                    emoji={diary.emoji}
                    photoList={diary.photoList}
                    createdDate={diary.createdDate}
                />
            ))}
    </div>);
}

export default DiaryBabyPage;
