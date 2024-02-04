import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css';
import FeedHeartButton from "@/assets/icons/FeedHeartButton";
import CommentHeartButton from "@/assets/icons/CommentHeartButton";

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
    console.log(comments)
    //좋아요 버튼 용도

    // 좋아요 개수를 가져와서 상태 업데이트
    const [countLike, setCountLike] = useState<number>(0);
    // useEffect(() => {
    //     const fetchLikeCount = async () => {
    //         const count = await countBoardLike(board.boardId);
    //         setCountLike(count);
    //     };
    //     fetchLikeCount();
    // }, [board.boardId]);
    // 좋아요 실시간 반영 용도
    const handleLikeStatusChange = async (likedStatus:boolean) => {
        if(likedStatus) {
            setCountLike(countLike + 1); // 좋아요가 눌렸을 때
        } else {
            setCountLike(countLike > 0 ? countLike - 1 : 0); // 좋아요가 해제되었을 때
        }
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
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>
                {comments.map((comment, index) => (
                    <div key={index} className="comment mb-[4%]">
                        <div className={"flex flex-row mb-[1%] items-center"}>
                            <CommentHeartButton likedata={{boardId:boardId, userId:userId, commentId:comment.commentId}} onLikeStatusChange={handleLikeStatusChange}/>
                            <div className={"mr-[3%]"}>{comment.userId}</div>
                            <p>{comment.content}sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                            {/* 작성자의 닉네임과 작성일을 표시하려면 아래 코드 주석을 해제 */}
                            {/* <p>작성자: {comment.nickname}</p> */}
                        </div>
                        <div className={"flex flex-row text-[65%] justify-around"}>
                            <p>좋아요 개</p>
                            <p>수정하기</p>
                            <p>삭제하기</p>
                            <p>작성일: {new Date(comment.createdDate).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    </div>
                ))}
                <div className="modal-input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="modal-input"
                        placeholder="댓글을 입력하세요..."
                    />
                    <button className="modal-submit-btn">제출</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
