import React, {useEffect, useState} from 'react';
import {commentLikeAPI, sendCommentLikeAPI, sendCommentUnlikeAPI} from "@/apis/Comments/CommentAPI";



const CommentHeartButton = ({ likedata, onLikeStatusChange  }) => {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        // likedata를 기반으로 좋아요 상태 초기화
        const fetchLikeStatus = async () => {
            const res = await commentLikeAPI(likedata.commentId, likedata.userId);
            setLiked(res);
        };
        fetchLikeStatus();
    }, [likedata.commentId]);


    const toggleLike = async () => {
        if(!liked) {
            setLiked(true);
            await sendCommentLikeAPI(likedata);
            onLikeStatusChange(true);
        } else {
            setLiked(false);
            await sendCommentUnlikeAPI(likedata.commentId, likedata.userId);
            onLikeStatusChange(false);
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

export default CommentHeartButton;
