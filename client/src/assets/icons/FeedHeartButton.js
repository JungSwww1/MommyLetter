import React, { useState } from 'react';
import { localFunction } from "@/components/Feed/ApiFunction";

const FeedHeartButton = ({ likedata }) => {
    const [liked, setLiked] = useState(false);
    const { sendBoardLike } = localFunction();

    const toggleLike = async () => {
        if(!liked) {
            setLiked(!liked);
            const { userId, boardId } = likedata;
            await sendBoardLike(userId, boardId);
            console.log('Like status toggled for:', { userId, boardId });
        } else {

        }
    };

    return (
        <button
            className={`${liked ? 'text-red-500' : 'text-white'}`}
            onClick={toggleLike}
        >
            {liked ? '❤️' : '🤍'}
        </button>
    );
};

export default FeedHeartButton;
