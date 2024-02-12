import React from 'react';
import {DirectMessageComponentProps} from "@/components/type/types";

const DirectMessageComponent = ({type, name, time, message, status, imageUrl}: DirectMessageComponentProps) => {
    var isStart = "chat-start";
    if(type) isStart = "chat-end"

    return (<div className={`chat ${isStart} m-5 ml-5 mr-5`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={imageUrl}/>
                </div>
            </div>
            <div className="chat-header">
                {name}
                <time className="text-xs opacity-50"></time>
            </div>
            <div className={`${type && "bg-blue-600"} chat-bubble `}>{message}</div>
            <div className="chat-footer opacity-50">{status}</div>
        </div>);
};

export default DirectMessageComponent;