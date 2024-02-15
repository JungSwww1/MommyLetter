import React, {useEffect, useState} from "react";
import DiaryListComponent from "@/components/DiaryList";
import {deleteDiary} from "@/apis/diary/DiaryAPI";
import {DiaryReadResponseProps} from "@/pages/type/types";
import CalendarComponent from "@/components/Calendar";
import {ReactComponent as Trash} from "@/assets/icons/trash.svg";
import {ReactComponent as Edit} from "@/assets/icons/edit.svg";
import {DiaryUpdate} from "@/pages/Diary/DiaryUpdate";

interface Props {
    diaryList: DiaryReadResponseProps[];
    setDiaryList: (e: any) => void;
    refreshDiary: () => void;
    userId: number;

}

const DiaryBabyPage: React.FC<Props> = ({diaryList, setDiaryList, refreshDiary, userId}) => {
    const [events, setEvents] = useState<any[]>([]);

    const [displayedDiaryList, setDisplayedDiaryList] = useState<DiaryReadResponseProps[]>([]);
    const [categoryDiaryList, setCategoryDiaryList] = useState<DiaryReadResponseProps[]>([]);

    const [modal, setModal] = useState(false);
    const [selectedDiaryId, setSelectedDiaryId] = useState<number>(0);
    const [selectedDiary, setSelectedDiary] = useState<DiaryReadResponseProps>();

    const [currYear, setCurrYear] = useState(0);
    const [currMonth, setCurrMonth] = useState(0);
    const [currDay, setCurrDay] = useState(0);

    const editButton = async (diary: DiaryReadResponseProps) => {
        setSelectedDiary(diary);
        const tempDate = new Date(diary.createdDate);
        setCurrYear(tempDate.getFullYear());
        setCurrMonth((tempDate.getMonth() + 1));
        setCurrDay(tempDate.getDate());
        showModal();
    }

    const showModal = () => {
        if (selectedDiary) (document.getElementById('diary_update') as any).showModal()
    }

    const deleteButton = (diaryId: number) => {
        setSelectedDiaryId(diaryId);
        setModal(true);
    }

    const deleteDiaryButton = () => {

        deleteDiary(selectedDiaryId);
        const temp = diaryList.filter((diary) => diary.diaryId !== selectedDiaryId);
        setDiaryList(temp);
        setModal(false);
    }
    const deleteLayout = (

        <div className="flex justify-center items-center">
            {/* 배경 */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            {/* 내용 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <p className="text-gray-700 font-bold">해당 일기를 삭제하시겠습니까?</p>
                    <br/>
                    <hr/>
                    <div className="flex justify-between">
                        <button className="btn w-[40%]" onClick={() => setModal(false)}>취소</button>
                        <button className="btn bg-red-300 w-[40%]" onClick={() => deleteDiaryButton()}>삭제</button>
                    </div>
                </div>
            </div>
        </div>);

    useEffect(() => {
        const newEvents: any[] = [];
        setCategoryDiaryList(diaryList.filter((diary) => diary.category === "Baby"));
        diaryList.forEach((diary) => {
            if (diary.category === "Baby") {
                newEvents.push({
                    backgroundColor: "#fffadf",
                    borderColor: "#fffadf",
                    diaryId: diary.diaryId,
                    content: diary.content,
                    date: diary.createdDate,
                    emoji: diary.emoji,
                    uploadFiles: diary.photoList,
                    category: diary.category,
                    userId: userId,
                    emotionList: diary.emoticon?.emotionList,
                    familyList: diary.emoticon?.familyList,
                    healthList: diary.emoticon?.healthList,
                    peopleList: diary.emoticon?.peopleList,
                    weatherList: diary.emoticon?.weatherList,
                });
            }
        });
        setDisplayedDiaryList(categoryDiaryList);
        setEvents(newEvents);
    }, [diaryList, userId]);

    return (<div>

        {selectedDiary ? <DiaryUpdate currYear={currYear} currMonth={currMonth} currDay={currDay} diary={selectedDiary}
                                      refreshDiary={refreshDiary} diaryList={diaryList} setDiaryList={setDiaryList} userId={userId}/> : null}
        <CalendarComponent events={events} refreshDiary={refreshDiary} diaryList={categoryDiaryList}
                           setDiaryList={setCategoryDiaryList} setDisplayedDiaryList={setDisplayedDiaryList} userId={userId}/>
        {modal && deleteLayout}

        {displayedDiaryList.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).map((diary) => (
            <div key={diary.diaryId}
                 className="flex flex-col w-[100%] hover:bg-gray-200 duration-300 rounded-[10px] bg-[#fffaf2] shadow-2xl ml-2 mb-3 mr-5">

                <div className="flex h-[10%] justify-end mt-3 z-10">
                    <button onClick={() => editButton(diary)}><Edit className="mr-4 hover:scale-150 duration-300"/>
                    </button>
                    <button onClick={() => deleteButton(diary.diaryId)}><Trash
                        className="mr-3 hover:scale-150 duration-300"/></button>
                </div>
                <DiaryListComponent
                    content={diary.content}
                    emoji={diary.emoji}
                    photoList={diary.photoList}
                    createdDate={diary.createdDate}
                />

            </div>))}
    </div>);
};

export default DiaryBabyPage;
