import React, { FC, useEffect, useState } from 'react';
import './Modal.css';
import CommentHeartButton from "@/assets/icons/CommentHeartButton";
import {countCommentLikeAPI} from "@/apis/Comments/CommentAPI";
import Message from "@/assets/icons/message";
import {
    CommentContainer,
    InputContainer,
    MainContainer,
    SubContainer, SubDiv,
    Submit,
    SubWrapper
} from "@/components/Feed/CommentModal/styles";

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
    nickname: string;
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

    //작성일 표시 용도
    const formatDate = (dateString:string) => {
        const date = new Date(dateString);
        const now = new Date();
        const difference = now.getTime() - date.getTime();

        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));

        if (minutes < 60) {
            return `${minutes}분 전`;
        } else if (hours < 24) {
            return `${hours}시간 전`;
        } else if (days < 7) {
            return `${days}일 전`;
        } else if (weeks < 4) {
            return `${weeks}주 전`;
        } else {
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
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
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리

    useEffect(() => {
        // 컴포넌트 마운트 시 모달 보여주기
        setShowModal(true);
    }, []);

    const [editingComment, setEditingComment] = useState<{ commentId: number; content: string; } | null>(null);
    // '수정' 버튼 클릭 이벤트 핸들러
    const handleEditClick = (comment: Comment) => {
        setEditingComment({ commentId: comment.commentId, content: comment.content });
        setInputValue(comment.content); // 입력 필드에 선택한 댓글의 내용을 표시
    };
    const handleSubmit = async () => {
        if (editingComment) {
            // 댓글 수정 로직을 여기에 추가
            // 예: updateCommentAPI(editingComment.commentId, inputValue);

            setEditingComment(null); // 수정 상태 해제
        } else {
            // 새 댓글 추가 로직을 여기에 추가
            // 예: addCommentAPI(boardId, userId, inputValue);
        }
        setInputValue(''); // 입력 필드 초기화
    };

    return (
        <div className={`modal-backdrop ${showModal ? 'show' : ''}`}  onClick={handleBackdropClick}>
            <div className={`modal-content scrollBar ${showModal ? 'show' : ''}`}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                {/* 이 위까지 모달 작동을 위한 CSS 부분 */}
                {/* 하단은 댓글 부분 */}
                {comments.map((comment, index) => (
                    <CommentContainer key={index}>
                        <MainContainer>
                            <CommentHeartButton likedata={{boardId:boardId, userId:userId, commentId:comment.commentId}}
                                                onLikeStatusChange={(likedStatus:boolean) => handleLikeStatusChange(comment.commentId, likedStatus)}/>
                            <div className={"ml-[2%] mr-[3%]"}>{comment.nickname}</div>
                            <p>{comment.content}</p>
                        </MainContainer>

                        <SubContainer>
                            <SubWrapper>
                                <p>좋아요 {countLikes[comment.commentId] || 0}개</p>
                                <SubDiv>
                                    {userId ===comment.userId ? (
                                        <>
                                        <p className={"mr-[3%] cursor-pointer"} onClick={() => handleEditClick(comment)}>수정</p>
                                        <p className={"mr-[3%]"}>삭제</p>
                                        </>
                                    ) : (
                                        <>
                                        <div className="mr-[3%] invisible">수정</div>
                                        <div className="mr-[3%] invisible">삭제</div>
                                        </>
                                    )}
                                </SubDiv>
                            </SubWrapper>
                            <p>{formatDate(comment.createdDate)}</p>
                        </SubContainer>
                    </CommentContainer>
                ))}

                {/* 댓글 입력 부분 */}
                <InputContainer>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="modal-input border-2 border-black rounded-xl"
                        placeholder="댓글을 입력하세요"
                    />
                    <Submit onClick={handleSubmit}><Message/></Submit>
                </InputContainer>

            </div>
        </div>
    );
};

export default Modal;
