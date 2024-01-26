import React,{FC} from 'react';

interface DirectMessageComponentProps {
    type: 'chat-start' | 'chat-end';
    name: string;
    time: string;
    message: string;
    status: string;
    imageUrl: string;
}

const DirectMessageComponent: React.FC<DirectMessageComponentProps> = ({ type, name, time, message, status ,imageUrl}) => {
    const isStart = type === 'chat-start';

    return (
        <div className={`chat ${isStart ? 'chat-start' : 'chat-end'} m-5 ml-5 mr-5`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={imageUrl}/>
                </div>
            </div>
            <div className="chat-header">
            {name}
                <time className="text-xs opacity-50">{time}</time>
            </div>
            <div className="chat-bubble">{message}</div>
            <div className="chat-footer opacity-50">{status}</div>
        </div>
    );
};

export default DirectMessageComponent;