import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {ReservationReq} from "@/apis/type/types";
import {createReservation} from "@/apis/consult/ConsultAPI";
import {ToastContainer} from 'react-toastify';
import {Toast} from "@/components/Toast/Toast";
interface CalendarProps {
    doctorId: number;
    userId: number;
}

const CalendarComponent = ({doctorId,userId}:CalendarProps) => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string>();
    const [combinedDateTime, setCombinedDateTime] = useState<Date | null>(null);

    const handleDateChange = (selectedDate: any) => {
        setDate(selectedDate);
        setSelectedTime("");
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {

        if (!userId || !doctorId) return;
        if(!selectedTime ) return Toast.error("시간을 선택하세요")
        if(!date ) return Toast.error("날짜를 선택하세요");
        const [hour, minute] = selectedTime.split(":");
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(parseInt(hour, 10));
        selectedDateTime.setMinutes(parseInt(minute, 10));
        setCombinedDateTime(selectedDateTime);
        if(!combinedDateTime) return;
        if(combinedDateTime<new Date()) return Toast.error("과거의 날짜는 선택 할 수 없음");
        const data: ReservationReq = {
            doctorId: doctorId, reserveDate: combinedDateTime.toISOString(), userId: userId
        }
        createReservation(data)
        Toast.success("진료 예약 성공!");
        setSelectedTime("");
        setDate(new Date());
    }

    return (<div>
        <ToastContainer/>
            <div className={`flex ${showCalendar ? 'visible' : 'hidden'}`}>
                <div >
                     <Calendar onChange={handleDateChange} value={date}/>
                </div>
                <div className="flex h-[100%] justify-center items-center flex-wrap" >
                    {[...Array(16)].map((_, index) => {
                        const hour = Math.floor(index / 2) + 9;
                        const minute = index % 2 === 0 ? '00' : '30';
                        const time = `${hour < 10 ? '0' : ''}${hour}:${minute}`;
                        return (<div
                                key={index}
                                className={`border-2 rounded-xl p-2 px-5 m-1 bg-white ${selectedTime === time ? 'bg-green-600 text-white' : 'bg-gray'}`}
                                onClick={() => handleTimeClick(time)}
                            >
                                {time}
                            </div>);
                    })}


                </div>

            </div>
            <div className="flex justify-end mr-5">
                <button className="btn btn-primary" onClick={handleConfirm}>확인</button>

            </div>
        <div className="flex flex-col justify-center items-center w-[100%]">
            <p className="font-bold">{date.getMonth()+1}월 {date.getDate()}일 {selectedTime}시</p>
        </div>
        </div>);
};

export default CalendarComponent;
