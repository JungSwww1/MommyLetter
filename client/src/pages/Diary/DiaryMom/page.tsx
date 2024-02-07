import React, {ReactNode, useEffect, useState} from "react";
import DiaryListComponent from "@/components/DiaryList";
import {fetchDiary} from "@/apis/diary/DiaryAPI";
import {DiaryReadResponseProps} from "@/pages/type/types";
import CalendarComponent from "@/components/Calendar";
import {DiaryResponseProps} from "@/components/type/types";

const DiaryMomPage = () => {
    const [diaryList, setDiaryList] = useState<DiaryResponseProps[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [diaryLists, setdiaryLists] = useState<ReactNode[]>([]);

    useEffect(() => {
        fetchDiary(101)
            .then((data) => {
                // 달력 라이브러리 변수
                const newEvents: any = [];

                // ReactNode 변수
                const diaryLists: any[] = [];
                data.forEach((diary: DiaryReadResponseProps) => {
                    if (diary.category === "Mom") {
                        newEvents.push({
                            imageurl: "/assets/images/seungwon.png",
                            backgroundColor: "#fffadf",
                            borderColor: "#fffadf",
                            diaryId:diary.diaryId,
                            title: diary.content,
                            date: diary.createdDate,
                            emoji: diary.emoji,
                            photoList: diary.photoList,
                            createdDate: diary.createdDate,
                            category: diary.category,
                            content: diary.content,
                            emotionList: diary.emoticon?.emotionList,
                            familyList: diary.emoticon?.familyList,
                            healthList: diary.emoticon?.healthList,
                            peopleList: diary.emoticon?.peopleList,
                            weatherList: diary.emoticon?.weatherList,

                        });
                        diaryLists.push(<DiaryListComponent
                            key={diary.diaryId}
                            content={diary.content}
                            emoji={diary.emoji}
                            photoList={diary.photoList}
                            createdDate={diary.createdDate}
                        />);
                    }
                });
                setEvents(newEvents);
                setdiaryLists(diaryLists);
            });
    }, []);


    return (
        <div>
            <CalendarComponent events={events}/>
            {diaryLists}
        </div>);
};

export default DiaryMomPage;
