import React from 'react';
import {ReactComponent as Camera} from '@/assets/icons/camera.svg'
import {ReactComponent as Picture} from '@/assets/icons/picture.svg'
const ChatBarComponent = () => {
    return (
        <div className="flex flex-col w-[100%] h-[40%]">
            <div className="flex flex-row items-center w-[100%] h-[100%] bg-gray-300 rounded-2xl p-5">
                <button><Camera className="mr-3"/></button>
                <input type="text" className="w-[90%] bg-gray-300"  placeholder="메시지 보내기..."/>
                <button><Picture /></button>
            </div>
        </div>
    );
};

export default ChatBarComponent;