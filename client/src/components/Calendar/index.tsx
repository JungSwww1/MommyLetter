import React, {useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {updateDiary} from "@/apis/diary/DiaryAPI";
import './index.css';
import {DiaryUpdateRequestProps} from "@/apis/type/types";
import {DiaryWrite} from "@/pages/Diary/DiaryWrite";
import {DiaryReadResponseProps} from "@/pages/type/types";
import {ToastContainer} from "react-toastify";
interface CalendarProps {
    events: any[];
    refreshDiary: () => void;
    diaryList: DiaryReadResponseProps[];
    setDiaryList: (e:any)=>void;
    setDisplayedDiaryList: (e:any)=>void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ events, refreshDiary, diaryList, setDiaryList,setDisplayedDiaryList}) => {
    const [currYear,setCurrYear] = useState(0);
    const [currMonth,setCurrMonth] = useState(0);
    const [currDay,setCurrDay] = useState(0);

    const [startProps, setStartProps] = useState({
        diaryId: 0, content: "", category: "", emoji: 0, uploadFiles: [],createdDate:"",
        emotionList:[],familyList:[],healthList:[],peopleList:[],weatherList:[],userId:0
    });
    var emojiArr:string[] = [];
    const path ="/assets/images/"
    const emotionImg = ["1sad.png","2lonely.png","3irritated.png","4tired.png","5angry.png","6soso.png","7delight.png","8calm.png","9delight.png","10excited.png"]
    for(let i = 0; i<10; i++){
        emojiArr[i] = path+emotionImg[i];

    }
    const buttonFunction = (info:any) => {
        const currDiary = diaryList.filter((diary)=>diary.diaryId===info.diaryId);
        setDisplayedDiaryList(currDiary);



    }
    const handleEventDragStart = (info: any) => {
        // dragstart 이벤트 처리
        setStartProps(info.event.extendedProps);
    };
    const handleEventDrop = (info: any) => {
        const formData = new FormData();
        startProps.uploadFiles.map((object:any) => object.path).forEach((file) => {
            formData.append('uploadFiles', file);

        });

        // year, month, date가 일치하는 일지가 있는지 확인
        const isDiaryExist = diaryList.some(diary =>
            info.event.start.getFullYear() === new Date(diary.createdDate).getFullYear() &&
            info.event.start.getMonth() + 1 === new Date(diary.createdDate).getMonth() + 1 &&
            info.event.start.getDate() === new Date(diary.createdDate).getDate()
        );

        // 일치하는 일지가 없으면 업데이트 실행
        if (!isDiaryExist) {
            const diaryRequest: DiaryUpdateRequestProps = {
                diaryId: startProps.diaryId,
                content: startProps.content,
                emoji: startProps.emoji,
                createdDate: info.event.startStr.substring(0,19),
                photoList: startProps.uploadFiles.map((file:any)=>file.path),
                emoticon: {
                    emotionList: (startProps.emotionList ?? []).map((object: any) => object.emotion),
                    familyList: (startProps.familyList ?? []).map((object: any) => object.family),
                    healthList: (startProps.healthList ?? []).map((object: any) => object.health),
                    peopleList: (startProps.peopleList ?? []).map((object: any) => object.people),
                    weatherList: (startProps.weatherList ?? []).map((object: any) => object.weather),
                },
            };
            formData.append('diaryRequest', new Blob([JSON.stringify(diaryRequest)], {
                type: "application/json"
            }));

            // 프론트에 있는 DiaryList 업데이트 해주는 로직
            var changeDiary = diaryList.filter((diary)=>diary.diaryId===diaryRequest.diaryId)[0];
            console.log(changeDiary["createdDate"] = info.event.startStr.substring(0,19));
            const tempDiaryList = [...diaryList.filter((diary)=>diary.diaryId!==startProps.diaryId),changeDiary];
            setDiaryList(tempDiaryList);

            // 백엔드에 있는 DiaryList 업데이트 해주는 로직
            updateDiary(startProps.userId,formData);
        } else {
            // 날짜가있는경우
            alert("이미 해당 날짜에 작성된 일지가 있습니다.");
        }
    };


    // 달력 locale을 한글로 설정하면 1일 2일 3일로 "일"이붙여서 나오게되는데 렌더링 후 "일"을 없애주는 함수
    const changeDayCell =(info:any)=>{
        var number = document.createElement("a");
        number.classList.add("fc-daygrid-day-number");
        number.innerHTML = info.dayNumberText.replace("일","").replace("日","");
        if(info.view.type==="dayGridMonth"){
            return{
                html: number.outerHTML
            };
        }
        return{
            domNodes:[]
        };
    }
    const clickDay = (info:any)=>{
        const clickedYear = info.getFullYear();
        const clickedMonth = info.getMonth() + 1;
        const clickedDay = info.getDate();
        setCurrYear(clickedYear);
        setCurrMonth(clickedMonth);
        setCurrDay(clickedDay);

        // year, month, date가 일치하는 일지가 있는지 확인
        const isDiaryExist = diaryList.some(diary =>
            clickedYear === new Date(diary.createdDate).getFullYear() &&
            clickedMonth === new Date(diary.createdDate).getMonth() + 1 &&
            clickedDay === new Date(diary.createdDate).getDate()
        );

        // 일치하는 일지가 없으면 모달을 열음
        if(isDiaryExist){
            alert("이미 해당 날짜에 작성된 일지가 있습니다.");
            return;
        }
        console.log(new Date())
        if(info>=new Date()){
            alert("미래의 일기는 작성할 수 없음");
            return;
        }
        (document.getElementById('my_modal_3') as any).showModal();

    }
    const handleEventAllow = (dropInfo:any) => {
        // dropInfo로부터 옮기려는 날짜 정보를 추출
        const dropDate = dropInfo.start;

        // 해당 날짜에 이미 일정이 있는지 확인
        const isDiaryExist = diaryList.some(diary =>
            dropDate.getFullYear() === new Date(diary.createdDate).getFullYear() &&
            dropDate.getMonth() + 1 === new Date(diary.createdDate).getMonth() + 1 &&
            dropDate.getDate() === new Date(diary.createdDate).getDate()
        );
        console.log(new Date());
        // 이미 일정이 있는 경우 false

        return !isDiaryExist && dropDate <= new Date();
    };
    return (
        <div id="calendar-container" className="p-5">
            <ToastContainer style={{}} position={"top-center"} hideProgressBar={true} autoClose={300}/>
            <DiaryWrite currYear={currYear} currMonth={currMonth} currDay={currDay} refreshDiary={refreshDiary}/>
            <FullCalendar
                locale="ko"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                eventDrop={handleEventDrop}
                eventDragStart={handleEventDragStart}
                events={events}
                eventAllow={handleEventAllow} // 이벤트를 옮길 수 있는지 여부를 결정하는 콜백 함수
                dayCellContent={changeDayCell}
                navLinks={true}
                navLinkDayClick={clickDay}
                eventContent={(eventInfo) => {
                    const {emoji} = eventInfo.event.extendedProps;
                    return (<div className="flex justify-center" onClick={() => {
                        buttonFunction(eventInfo.event.extendedProps);
                    }}>
                        <img className="h-[10%] w-[50%]" src={emojiArr[emoji]} alt="Event Image"/>
                    </div>);
                }}
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                }}

            />

        </div>);
};

export default CalendarComponent;