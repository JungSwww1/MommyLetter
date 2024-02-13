import React from 'react';
import {ReactComponent as Camera} from "@/assets/icons/camera.svg";
import {DirectMessageCardProps} from "@/components/type/types";
import potato from "../../assets/images/logo.png";

const DirectMessageCard = ({nickname,profileUrl,date,content}:DirectMessageCardProps) => {
    const elapsedTime = (date: number): string => {
        const start = new Date(date);
        const end = new Date();

        const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
        if (seconds < 60) return '방금 전';

        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;

        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;

        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;

        return `${start.toLocaleDateString()}`;
    };

    const onErrorImg = (e:any) => {
        console.log(e.target.src);
        e.target.src = potato;
    }
    return (
        <div className="flex flex-col w-[100%]">
            <div className="flex flex-row m-3">
                <img className="w-[10%] p-3 " src={profileUrl} onError={onErrorImg}/>
                <div className="flex flex-col justify-center w-[78%]">
                    <p className="font-bold">{nickname}</p>
                    <div>
                        <span className="text-gray-500 mr-3">{content}</span>
                        <span className="text-gray-400">· {elapsedTime(parseInt(date))}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center mr-5">
                    <div className=" w-[10px] h-[10px] bg-blue-600 rounded-[100%]"></div>
                </div>
                <div className="flex flex-col justify-center">
                    <Camera/>
                </div>
            </div>
            
        </div>


    )};

export default DirectMessageCard;