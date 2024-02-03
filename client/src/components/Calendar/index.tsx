import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {updateDiary} from "@/apis/diary/DiaryAPI";
import './index.css';
import {DiaryWriteRequestProps} from "@/apis/type/types";
import WriteModal from "@/components/Modal";
import {DiaryWrite} from "@/pages/Diary/DiaryWrite";

const CalendarComponent = (events: any) => {

    const [currYear,setCurrYear] = useState("");
    const [currMonth,setCurrMonth] = useState("");
    const [currDay,setCurrDay] = useState("");

    const [startProps, setStartProps] = useState({
        diaryId: 0, content: "", category: "", emoji: 0, photoList: [],createdDate:"",
        emotionList:[],familyList:[],healthList:[],peopleList:[],weatherList:[]
    });
    const navigate = useNavigate();
    const buttonFunction = () => {
    }
    const handleEventDragStart = (info: any) => {
        // dragstart 이벤트 처리
        setStartProps(info.event.extendedProps);
    };
    const handleEventDrop = (info: any) => {
        const diary: DiaryWriteRequestProps = {
            diaryId: startProps.diaryId,
            content: startProps.content,
            emoji: startProps.emoji,
            createdDate: info.event.startStr.substring(0,19),
            photoList: startProps.photoList.map((object:any) => object.path),
            emoticonRequest: {
                emotionList: (startProps.emotionList ?? []).map((object: any) => object.emotion),
                familyList: (startProps.familyList ?? []).map((object: any) => object.family),
                healthList: (startProps.healthList ?? []).map((object: any) => object.health),
                peopleList: (startProps.peopleList ?? []).map((object: any) => object.people),
                weatherList: (startProps.weatherList ?? []).map((object: any) => object.weather),
            },
        };

        updateDiary(diary);
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
        setCurrYear(info.getFullYear().toString());
        setCurrMonth(info.getMonth().toString());
        setCurrDay(info.getDate().toString());
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
                    const {imageurl} = eventInfo.event.extendedProps;
                    return (<div className="flex justify-center" onClick={() => {
                        buttonFunction()
                    }}>
                        <img className="h-[10%] w-[50%]" src={imageurl} alt="Event Image"/>
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