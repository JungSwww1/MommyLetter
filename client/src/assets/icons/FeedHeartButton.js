import React, {useEffect, useState} from 'react';
import {boardLikeAPI, sendBoardLikeAPI, sendBoardUnlikeAPI} from "@/apis/Board/boardApi";


const FeedHeartButton = ({ likedata, onLikeStatusChange  }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // likedata를 기반으로 좋아요 상태 초기화
        const fetchLikeStatus = async () => {
            const res = await boardLikeAPI(likedata.userId, likedata.boardId);
            setLiked(res);
        };
        fetchLikeStatus();
    }, [likedata.userId, likedata.boardId]);


    const toggleLike = async () => {
        if(!liked) {
            setLiked(true);
            await sendBoardLikeAPI(likedata);
            onLikeStatusChange(true);
        } else {
            setLiked(false);
            await sendBoardUnlikeAPI(likedata.userId, likedata.boardId);
            onLikeStatusChange(false);
        }
    };

    return (
        <button
            className={`${liked ? 'text-red-500' : 'text-white'} text-2xl`}
            onClick={toggleLike}
        >
            {liked ? '❤️' : '🤍'}
        </button>
    );
};

export default FeedHeartButton;
