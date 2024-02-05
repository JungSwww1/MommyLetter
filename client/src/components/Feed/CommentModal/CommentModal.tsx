import React, { FC, useEffect, useState } from 'react';
import './Modal.css';
import CommentHeartButton from "@/assets/icons/CommentHeartButton";
import {countCommentLikeAPI} from "@/apis/Comments/CommentAPI";
import Message from "@/assets/icons/message";

interface ModalProps {
    onClose: () => void;
    comments : Comment[];
    boardId: number;
    userId : number;
}

interface Comment {
    commentId: number;
    userId: number;
    content: string;
    createdDate: string;
    updatedDate: string;
    // 추가: 작성자의 닉네임을 나타내는 필드가 필요하다면 여기에 추가
    nickname?: string;
}

const Modal: FC<ModalProps> = ({ onClose, comments , boardId, userId}) => {
    // 좋아요 개수를 가져와서 상태 업데이트
    const [countLikes, setCountLikes] = useState<{[key: number]: number}>({});
    useEffect(() => {
        const fetchLikeCounts = async () => {
            const initialCountLikes: { [key: number]: number } = {};
            for (const comment of comments) {
                const count = await countCommentLikeAPI(comment.commentId);
                initialCountLikes[comment.commentId] = count;
            }
            setCountLikes(initialCountLikes);
        };
        fetchLikeCounts();
    }, [comments]);

    // 좋아요 실시간 반영 용도
    const handleLikeStatusChange = async (commentId: number, likedStatus: boolean) => {
        // 현재 좋아요 상태를 기반으로 새 상태를 계산
        setCountLikes(prevCountLikes => {
            const currentCount = prevCountLikes[commentId] || 0;
            return {
                ...prevCountLikes,
                [commentId]: likedStatus ? currentCount + 1 : Math.max(currentCount - 1, 0)
            };
        });
    };


    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const [inputValue, setInputValue] = useState(''); // 입력 필드의 상태 관리
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // 입력 필드의 값을 상태로 설정
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content scrollBar">
                <span className="modal-close" onClick={onClose}>&times;</span>
                {comments.map((comment, index) => (
                    <div key={index} className="comment mb-[4%]">
                        <div className={"flex flex-row mb-[2%] items-center"}>
                            <CommentHeartButton likedata={{boardId:boardId, userId:userId, commentId:comment.commentId}}
                                                onLikeStatusChange={(likedStatus:boolean) => handleLikeStatusChange(comment.commentId, likedStatus)}/>
                            <div className={"ml-[2%] mr-[3%]"}>{comment.userId}</div>
                            <p>{comment.content}</p>
                        </div>
                        <div className={"flex flex-row text-[65%] justify-between"}>
                            <p>좋아요 {countLikes[comment.commentId] || 0}개</p>
                            <div className={"w-[50%] flex flex-row"}>
                                {userId ===comment.userId ? (
                                    <>
                                    <p className={"mr-[3%]"}>수정</p>
                                    <p className={"mr-[3%]"}>삭제</p>
                                    </>
                                ) : (
                                    <>
                                    <div className="mr-[3%] invisible">수정</div>
                                    <div className="mr-[3%] invisible">삭제</div>
                                    </>
                                )}
                                <p>작성일: {new Date(comment.createdDate).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex modal-input-container items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="modal-input border-2 border-black rounded-xl"
                        placeholder="댓글을 입력하세요"
                    />
                    <button className="modal-submit-btn btn bg-blue-400 hover:bg-blue-500 text-white"><Message/></button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
