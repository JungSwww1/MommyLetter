import React from 'react';
import DirectMessageComponent from "@/components/DirectMessage";
import WriteModal from "@/components/Modal";
import ChatBarComponent from "@/components/ChatBar";


const DirectMessagePage: React.FC = () => {
    return (
        <div className="flex flex-col h-[100%] w-[100%]">
            <div className="h-[90%]">
            <DirectMessageComponent
                type="chat-start"
                name="Obi-Wan Kenobi"
                time="12:45"
                message="You were the Chosen One!"
                status="Delivered"
                imageUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
            <DirectMessageComponent
                type="chat-end"
                name="Anakin"
                time="12:46"
                message="I hate you!"
                status="Seen at 12:46"
                imageUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
            </div>

        </div>
    );
};

export default DirectMessagePage;