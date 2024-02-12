import {useEffect, useState} from 'react';
import {ReactComponent as Camera} from '@/assets/icons/camera.svg';
import {ReactComponent as Picture} from '@/assets/icons/picture.svg';
import * as Stomp from "@stomp/stompjs";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {enterDM, fetchChatList, fetchDMList, leaveDM} from "@/apis/DM/DMAPI";
import {useParams} from "react-router-dom";
import DirectMessage from "@/components/DirectMessage";
import {getProfileAPI} from "@/apis/profile/ProfileAPI";

interface DMProps {
    senderId: number;
    receiverId: number;
    nickname: string;
    profilePhoto: string;
    content: string;
    chatGroupId: number;
    createdDate: string;
}

interface DMInfoProps {
    "chatGroupId": number,
    "chatRoomName": string,
    "createdDate": string
}

const DirectMessageDetailPage = () => {
    const [chatList, setChatList] = useState<DMProps[]>([]);
    const [chat, setChat] = useState<string>("");
    let [client, setClient] = useState<Stomp.Client>();
    const [opponent, setOpponent] = useState<number>()
    const user = MommyLetterWS.getInstance().getUserInfo();
    const roomNumber = useParams()["roomNumber"];
    useEffect(() => {

        fetchDMList(Number(user["userId"])).then((response) => {
            const result = response.filter((info: DMInfoProps) => info.chatGroupId == Number(roomNumber))[0];
            const chatGroupName = result.chatRoomName.split("_")
            const opponentId = chatGroupName[2] == user["userId"] ? Number(chatGroupName[1]) : Number(chatGroupName[2]);
            setOpponent(opponentId);
            enterDM(Number(user["userId"]), opponentId);
            var opponentNickname = "";
            var opponentProfilePhoto = "";
            var myProfilePhoto = "";
            var myNickname = "";
            getProfileAPI(opponentId).then((response) => {
                opponentNickname = response.nickname;
                opponentProfilePhoto = response.profilePhoto;
            })
            getProfileAPI(Number(user["userId"])).then((response) => {
                myNickname = response.nickname;
                myProfilePhoto = response.profilePhoto;
            })
            fetchChatList(Number(user["userId"]), opponentId).then((response) => {
                response.forEach((chat: DMProps) => {
                    const tempChat: DMProps = {
                        senderId: chat.senderId,
                        receiverId: chat.receiverId,
                        nickname: chat.senderId === Number(user["userId"]) ? myNickname : opponentNickname,
                        profilePhoto: chat.senderId === Number(user["userId"]) ? myProfilePhoto : opponentProfilePhoto,
                        content: chat.content,
                        chatGroupId: chat.chatGroupId,
                        createdDate: chat.createdDate,
                    }
                    setChatList(prevState => [tempChat,...prevState]);
                })
            })

        })
        console.log(chatList);
    }, []);
    useEffect(() => {

        // 최초 렌더링 시 , 웹소켓에 연결
        connect();

        return () => {
            disConnect();
            if (opponent) leaveDM(Number(user["userId"]), opponent)
        }
    }, []);

    useEffect(() => {

    }, [chatList]);

    const connect = () => {
        const clientdata = new Stomp.Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders: MommyLetterWS.getInstance().header,
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });


        clientdata.onConnect = function () {
            clientdata.subscribe("/sub/enter/" + roomNumber, callback);
            clientdata.subscribe("/sub/dm/" + roomNumber, callback);
        };

        clientdata.activate(); // 클라이언트 활성화
        setClient(clientdata); // 클라이언트 갱신

    }
    const callback = function (message: any) {
        if (message.body) {
            let msg = JSON.parse(message.body);

        }
    };


    const sendChat = () => {
        if (!chat || !user["userId"] || !opponent) {
            return;
        }
        const msg: DMProps = {
            senderId: Number(user.userId),
            receiverId: opponent,
            content: chat,
            chatGroupId: Number(roomNumber),
            nickname: user["userId"],
            profilePhoto: "",
            createdDate: new Date().toString()
        };

        // 서버로 메시지 전송
        client?.publish({
            destination: "/pub/message", body: JSON.stringify(msg),
        });

        // 실시간으로 채팅 내용 반영
        setChatList((prevChatList: DMProps[]) => [...prevChatList, msg]);

        // 채팅 입력 필드 초기화
        setChat("");
    };


    const disConnect = () => {
        // 연결 끊기
        if (client === null) {
            return;
        }
        client?.deactivate();
    };

    return (<div className="flex flex-col h-[100%] w-[100%]">
            <div className="h-[95%]">
                {chatList.map((chat,index) => (
                    <DirectMessage key={index} type={chat.senderId === Number(user["userId"])} name={chat.nickname} time={new Date(chat.createdDate).toString()}
                                   message={chat.content} status={""} imageUrl={"/assets/images/potato.png"}
                    />))}


            </div>

            <div className="absolute bottom-0 h-[5%] w-[40%] ">
                <div className="flex flex-row items-center w-[100%] h-[100%] bg-gray-300 rounded-2xl p-5">
                    <button><Camera className="mr-3"/></button>
                    <input type="text" onChange={(e) => setChat(e.target.value)} className="w-[90%] bg-gray-300"
                           placeholder="메시지 보내기..."
                           value={chat}/>
                    <button><Picture/></button>
                    <button onClick={sendChat}>확인</button>
                </div>
            </div>
        </div>);
};

export default DirectMessageDetailPage;