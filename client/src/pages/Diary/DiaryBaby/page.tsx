import React, { useEffect, useState } from "react";
import DiaryListComponent from "@/components/DiaryList";
import { fetchDiary } from "@/apis/diary/DiaryAPI";
import { DiaryReadResponseProps } from "@/pages/type/types";
import CalendarComponent from "@/components/Calendar";
import { DiaryResponseProps } from "@/components/type/types";

interface UserProps {
    nickname: string;
    userId: string;
}

const DiaryMomPage = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [diaryList, setDiaryList] = useState<React.ReactNode[]>([]);
    const [user, setUser] = useState<UserProps>({ nickname: '', userId: '' });

    useEffect(() => {
        const storedAuth = localStorage.getItem('Auth');
        if (storedAuth) {
            const parsedAuth: UserProps = JSON.parse(storedAuth);
            setUser(parsedAuth);
        }
    }, []);

    useEffect(() => {
        fetchDiary(Number(user.userId))
            .then((data) => {
                const newEvents: any[] = [];
                const newDiaryList: React.ReactNode[] = [];
                data.forEach((diary: DiaryReadResponseProps) => {
                    if (diary.category === "Baby") {
                        newEvents.push({
                            imageurl: "/assets/images/seungwon.png",
                            backgroundColor: "#fffadf",
                            borderColor: "#fffadf",
                            diaryId: diary.diaryId,
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
                        newDiaryList.push(
                            <DiaryListComponent
                                key={diary.diaryId}
                                content={diary.content}
                                emoji={diary.emoji}
                                photoList={diary.photoList}
                                createdDate={diary.createdDate}
                            />
                        );
                    }
                });
                setEvents(newEvents);
                setDiaryList(newDiaryList);
            });
    }, [user]); // Changed dependency to user

    return (
        <div>
            <CalendarComponent events={events}/>
            {diaryList}
        </div>
    );
};

export default DiaryMomPage;
