import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {DoctorRes, ReservationReq} from "@/apis/type/types";
import {createReservation} from "@/apis/consult/ConsultAPI";
import {ToastContainer} from 'react-toastify';
import {Toast} from "@/components/Toast/Toast";
import {fetchDMList, startDM} from "@/apis/DM/DMAPI";
import {useNavigate, useParams} from "react-router-dom";
import {readDoctorDetail} from "@/apis/profile/ProfileAPI";
import * as Stomp from "@stomp/stompjs";
import {readConsultInfo} from "@/apis/Auth/authAPI";

interface CalendarProps {
    doctorId: number;
    userId: number;
}

interface DMProps {
    userId: number;
    chatGroupId: number;
}

const CalendarComponent = ({doctorId, userId}: CalendarProps) => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string>();
    const [combinedDateTime, setCombinedDateTime] = useState<Date | null>(null);
    const [doctorUserId, setDoctorUserId] = useState<number>()
    const [doctor, setDoctor] = useState<DoctorRes>();
    const [myDMList, setMyDMList] = useState<DMProps[]>([])
    const param = useParams()["id"];
    let [client, setClient] = useState<Stomp.Client>();
    const [chatGroupId, setChatGroupId] = useState<number>()
    const [isConsultInfo, setIsConsultInfo] = useState<boolean>()
    const navigate = useNavigate();
    useEffect(() => {
        readDoctorDetail(Number(param)).then((response) => {
            setDoctorUserId(response.userId);
            setDoctor(response);
        })
    }, [param]);
    useEffect(() => {
        readConsultInfo(Number(userId)).then((response)=>{
            if(response.userInfoId) setIsConsultInfo(true);
        })
    }, [userId]);

    useEffect(() => {
        if (!doctorUserId) return;
        fetchDMList(doctorUserId).then((response) => {
            response.map((dm: any) => {
                const dmList: DMProps[] = response.map((dm: any) => ({
                    chatGroupId: Number(dm.chatGroupId),
                    userId: doctorUserId == Number(dm.chatRoomName.split("_")[2]) ? Number(dm.chatRoomName.split("_")[1]) : Number(dm.chatRoomName.split("_")[2])
                }));
                setMyDMList(dmList);
            });
        })
    }, [doctorUserId]);

    useEffect(() => {
        goDm(userId);
        if(!chatGroupId) return;
        connect(chatGroupId);
    }, [doctorUserId,chatGroupId]);

    (chatGroupId);
    const handleDateChange = (selectedDate: any) => {
        setDate(selectedDate);
        setSelectedTime("");
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {

        if (!userId || !doctorId) return;
        if (!selectedTime) return Toast.error("시간을 선택하세요")
        if (!date) return Toast.error("날짜를 선택하세요");
        const [hour, minute] = selectedTime.split(":");
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(parseInt(hour, 10));
        selectedDateTime.setMinutes(parseInt(minute, 10));
        setCombinedDateTime(selectedDateTime);
        if (!combinedDateTime) return;
        if (combinedDateTime < new Date()) return Toast.error("과거의 날짜는 선택 할 수 없음");
        const data: ReservationReq = {
            doctorId: doctorId, reserveDate: combinedDateTime.toISOString(), userId: userId
        }
        if(!isConsultInfo) {

            Toast.error("상담정보를 등록하고 예약해주세요!");
            setTimeout(()=>{
                return navigate("/consultRegist");
            },1000)

        }
        else {
            createReservation(data)
            Toast.success(`[예약완료] 메세지를 확인하세요!`);

            client?.publish({
                destination: "/pub/message",
                body: JSON.stringify({
                    senderId: Number(doctorUserId),
                    receiverId: userId,
                    content: `${date.getMonth() + 1}월 ${date.getDate()}일 ${selectedTime}시 예약되었습니다. 약속한 시간에 https://healthpanda.site/ 접속바랍니다. `,
                    chatGroupId: chatGroupId,
                }),
            });
        }
        client?.deactivate();
        setSelectedTime("");
        setDate(new Date());

    }
    const goDm =  (otherUserId: number) => {
        if (!doctorUserId) return;

        const isUsed = myDMList.find((tempUser: DMProps) => tempUser.userId === otherUserId)
        if (isUsed) setChatGroupId(isUsed.chatGroupId)
        else {
            startDM(doctorUserId, otherUserId)
                .then(response => {
                    setMyDMList(prevState => [...prevState, response, otherUserId])
                    setChatGroupId(response);

                });
        }

    };
    const connect = (roomNumber: number) => {
        const clientdata = new Stomp.Client({
            brokerURL: "ws://i10a509.p.ssafy.io:8081/ws", connectHeaders: {}
            , debug: function (str) {
                console.log(str);

            }, reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000, heartbeatOutgoing: 4000,
        });

        clientdata.onConnect = function () {
            clientdata.subscribe("/sub/enter/" + roomNumber, callback);
            clientdata.subscribe("/sub/dm/" + roomNumber, callback);
        };

        clientdata.activate(); // 클라이언트 활성화
        setClient(clientdata); // 클라이언트 갱신

    }
const callback = function (message: any) {
    console.log(message.body);
};

return (<div className="w-[100%]">
    <ToastContainer/>
    <div className={`
        }flex ${showCalendar ? 'visible' : 'hidden'}`}>
        <div>
            <Calendar onChange={handleDateChange} value={date}/>
        </div>
        <div className="flex h-[100%] justify-center items-center flex-wrap">
            {[...Array(16)].map((_, index) => {
                const hour = Math.floor(index / 2) + 9;
                const minute = index % 2 === 0 ? '00' : '30';
                const time = `${hour < 10 ? '0' : ''}${hour}:${minute}`;
                return (<div
                    key={index}
                    className={` border-2 rounded-xl p-2 px-5 m-1 bg-white ${selectedTime === time ? 'bg-green-600 text-white' : 'bg-white-500'}`}
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
        <p className="font-bold">{date.getMonth() + 1}월 {date.getDate()}일 {selectedTime}시</p>
    </div>
</div>);
}


export default CalendarComponent;
