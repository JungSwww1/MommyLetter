import {useEffect, useRef, useState} from 'react';
import {ReactComponent as Camera} from '@/assets/icons/camera.svg';
import {ReactComponent as Picture} from '@/assets/icons/picture.svg';
import * as Stomp from "@stomp/stompjs";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {enterDM, fetchChatList, fetchDMList, leaveDM} from "@/apis/DM/DMAPI";
import {useParams} from "react-router-dom";
import DirectMessage from "@/components/DirectMessage";
import {getProfileAPI} from "@/apis/profile/ProfileAPI";
import "./index.css";
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
interface defaultSend{
    sendMessage:string;
}

const DirectMessageDetailPage = () => {
    const [chatList, setChatList] = useState<DMProps[]>([]);
    const [chat, setChat] = useState<string>("");
    let [client, setClient] = useState<Stomp.Client>();
    const [opponent, setOpponent] = useState<number>()
    const user = MommyLetterWS.getInstance().getUserInfo();
    const roomNumber = Number(useParams()["roomNumber"]);
    const chatUlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(roomNumber) {
            connect(roomNumber);
        }
        return () => disConnect();
    }, [roomNumber]);
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
            fetchChatList(Number(user["userId"]), opponentId) .then((response) => {
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




    const connect = (roomNumber:number) =>{
        const clientdata = new Stomp.Client({
            brokerURL: "ws://i10a509.p.ssafy.io:8081/ws",
            connectHeaders:{}
            // MommyLetterWS.getInstance().header
            ,
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        console.log(roomNumber);

        clientdata.onConnect = function () {
            clientdata.subscribe("/sub/enter/" + roomNumber, callback);
            clientdata.subscribe("/sub/dm/" + roomNumber, callback);
        };

        clientdata.activate(); // 클라이언트 활성화
        setClient(clientdata); // 클라이언트 갱신

    }
    const callback = function (message:any) {

        console.log(message.body);
        if (message.body) {
            let msg = JSON.parse(message.body);
            setChatList((chats:any) => [...chats, msg]);
        }
        console.log(chatList)
    };

    const handleOnKeyPress= (e:any) =>{
        if (e.key === 'Enter') {
            sendChat();
        }
    }

    const sendChat = () => {
        if (!chat || !user["userId"] || !opponent) {
            return;
        }

        client?.publish({
            destination: "/pub/message",
            body: JSON.stringify({
                senderId:Number(user["userId"]),
                receiverId:opponent,
                content:chat,
                chatGroupId:roomNumber,
            }),
        });

        setChat("");
    };

    const disConnect = () => {
        // 연결 끊기
        if (client === null) {
            return;
        }
        client?.deactivate();
    };


    useEffect(() => {
        const scrollToBottom = () => {
            if (chatUlRef.current) {
                chatUlRef.current.scrollTop = chatUlRef.current.scrollHeight;
            }
        };

        // 새로운 채팅이 추가될 때마다 스크롤을 아래로 이동시킵니다.
        const observer = new MutationObserver(scrollToBottom);
        if (chatUlRef.current) {
            observer.observe(chatUlRef.current, { childList: true });
        }

        // 컴포넌트가 언마운트될 때 옵저버를 정리합니다.
        return () => {
            observer.disconnect();
        };
    }, []);

    // 초기 렌더링 시 스크롤을 아래로 이동시킵니다.
    useEffect(() => {
        if (chatUlRef.current) {
            chatUlRef.current.scrollTop = chatUlRef.current.scrollHeight;
        }
    }, []);
    return (<div className="flex flex-col h-[100%] w-[100%]">
        <div
            ref={chatUlRef} className="flex flex-col h-[95%] scrollBar chat_ul overflow-y-auto">
            {chatList.map((chat, index) => (
                <DirectMessage key={index} type={chat.senderId === Number(user["userId"])} name={chat.nickname}
                               time={new Date(chat.createdDate).toString()}
                               message={chat.content} status={""} imageUrl={`${chat.profilePhoto  ? "/profileimages/"+chat.profilePhoto.substring(88,) : "/assets/images/default_image.png"}`}
                />))}


        </div>

        <div className="fixed bottom-0 h-[5%] w-[40%] ">
            <div className="flex flex-row items-center w-[100%] h-[100%] bg-gray-300 rounded-2xl p-5">

                <input type="text" onChange={(e) => setChat(e.target.value)} className="w-[95%] bg-gray-300"
                       placeholder="메시지 보내기..."
                       value={chat}
                       onKeyUp={handleOnKeyPress}/>
                <button onClick={sendChat}>확인</button>
            </div>
        </div>
    </div>);
};

export default DirectMessageDetailPage;
