import React, {useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {updateDiary} from "@/apis/diary/DiaryAPI";
import './index.css';
import {hasCustomDayCellContent} from "@fullcalendar/core/internal";

const CalendarComponent = (events: any) => {

    const [startProps, setStartProps] = useState({
        diaryId: 0, content: "", category: "", emoji: 0, photoList: [],
    });


    const buttonFunction = () => {
        alert("hello");
    }
    const handleEventDragStart = (info: any) => {
        // dragstart 이벤트 처리
        setStartProps(info.event.extendedProps);
    };
    const handleEventDrop = (info: any) => {
        updateDiary({
            diaryId: startProps.diaryId,
            content: startProps.content,
            emoji: startProps.emoji,
            category: startProps.category,
            photoList: startProps.photoList.filter((prop)=>{prop==="path"})
        });
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
    return (
        <div id="calendar-container" className="p-5">
            <FullCalendar
                locale="ko"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                eventDrop={handleEventDrop}
                eventDragStart={handleEventDragStart}
                events={events}
                dayCellContent={changeDayCell}
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