import React, {useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {updateDiary} from "@/apis/diary/DiaryAPI";
import './index.css';
import {DiaryUpdateRequestProps} from "@/apis/type/types";
import {DiaryWrite} from "@/pages/Diary/DiaryWrite";
const CalendarComponent = (events: any) => {

    const [currYear,setCurrYear] = useState(0);
    const [currMonth,setCurrMonth] = useState(0);
    const [currDay,setCurrDay] = useState(0);

    const [startProps, setStartProps] = useState({
        diaryId: 0, content: "", category: "", emoji: 0, uploadFiles: [],createdDate:"",
        emotionList:[],familyList:[],healthList:[],peopleList:[],weatherList:[],userId:0
    });
    var emojiArr:string[] = [];
    emojiArr[0] = "/assets/images/sample_angry.png";
    emojiArr[1] = "/assets/images/sample_bad.png";
    emojiArr[2] = "/assets/images/sample_good.png";
    emojiArr[3] = "/assets/images/sample_soso.png";
    emojiArr[4] = "/assets/images/sample_tired.png";

    const buttonFunction = () => {
        alert("heelo")
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
        const diaryRequest: DiaryUpdateRequestProps = {
            diaryId: startProps.diaryId,
            content: startProps.content,
            emoji: startProps.emoji,
            createdDate: info.event.startStr.substring(0,19),
            photoList: [],
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

        updateDiary(startProps.userId,formData);
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
        const curr = new Date(info)
        setCurrYear(info.getFullYear());

        setCurrMonth((info.getMonth()+1));
        setCurrDay(info.getDate());
        (document.getElementById('my_modal_3') as any).showModal()

    }
    return (
        <div id="calendar-container" className="p-5">
            <DiaryWrite currYear={currYear} currMonth={currMonth} currDay={currDay}/>
            <FullCalendar
                locale="ko"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                eventDrop={handleEventDrop}
                eventDragStart={handleEventDragStart}
                events={events}
                dayCellContent={changeDayCell}
                navLinks={true}
                navLinkDayClick={clickDay}
                eventContent={(eventInfo) => {
                    const {emoji} = eventInfo.event.extendedProps;
                    return (<div className="flex justify-center" onClick={() => {
                        buttonFunction();
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