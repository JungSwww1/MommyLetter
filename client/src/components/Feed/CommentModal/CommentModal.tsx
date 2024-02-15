import React, { FC, useEffect, useState } from 'react';
import './Modal.css';
import CommentHeartButton from "@/assets/icons/CommentHeartButton";
import {
    addCommentAPI,
    countCommentLikeAPI,
    deleteCommentAPI,
    getAllCommentsAPI,
    updateCommentAPI
} from "@/apis/Comments/CommentAPI";
import Message from "@/assets/icons/message";
import {
    CommentContainer,
    InputContainer,
    MainContainer,
    SubContainer, SubDiv,
    Submit,
    SubWrapper
} from "@/components/Feed/CommentModal/styles";
import {FormatDate} from "@/components/Feed/LocalFunction";
import AlertModal from "@/pages/Feed/AlertModal";
import {useNavigate} from "react-router-dom";


interface ModalProps {
    onClose: () => void;
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

const Modal: FC<ModalProps> = ({ onClose , boardId, userId}) => {
    const navigate = useNavigate()
    const [comments, setComments] = useState<Comment[]>([]);
    const [event, setEvent] = useState(0)
    const fetchComments = async () => {
        const commentsData = await getAllCommentsAPI(boardId);
        setComments(commentsData);
    };

    // 컴포넌트 마운트 시 댓글 목록 불러오기
    useEffect(() => {
        fetchComments();
    }, [event]);

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

    // 이건 input 제출 버튼
    const handleSubmit = async () => {
        if (inputValue.trim() === '') {
            alert("댓글을 입력해주세요")
            return;
        } else {
            const data = {userId : userId, boardId: boardId, content:inputValue}
            if (editingComment) {
                await updateCommentAPI(editingComment.commentId, inputValue)
                setEditingComment(null); // 수정 상태 해제
            } else {
                await addCommentAPI(data)
                await setEvent(1)
            }
            setInputValue(''); // 입력 필드 초기화
            await fetchComments();
        }
    };

    // 삭제 버튼 클릭
    const handleDeleteClick = async (commentId:number) => {
        const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
        if (isConfirmed) {
            await deleteCommentAPI(commentId); // 댓글 삭제 API 호출
            alert("삭제 완료");
            await fetchComments();
            await setEvent(2)
        }
    }

    const moveProfile = (userId:number) => {
        navigate(`profile/${userId}`)
    }
    return (

        <div className={`modal-backdrop ${showModal ? 'show' : ''}`}  onClick={handleBackdropClick}>
            <div className={`modal-content1 scrollBar ${showModal ? 'show' : ''}`}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                {/* 이 위까지 모달 작동을 위한 CSS 부분 */}
                {/* 하단은 댓글 부분 */}
                {comments .map((comment, index) => (
                    <CommentContainer key={index}>
                        <MainContainer>
                            <CommentHeartButton
                                likedata={{boardId: boardId, userId: userId, commentId: comment.commentId}}
                                onLikeStatusChange={(likedStatus: boolean) => handleLikeStatusChange(comment.commentId, likedStatus)}/>
                            <div className={"ml-[2%] mr-[3%]"} onClick={()=>moveProfile(comment.userId)}>{comment.nickname}</div>
                            <p>{comment.content}</p>
                        </MainContainer>

                        <SubContainer>
                            <SubWrapper>
                                <p>좋아요 {countLikes[comment.commentId] || 0}개</p>
                                <SubDiv>
                                    {Number(userId) === Number(comment.userId) ? (
                                        <>
                                            <p className={"mr-[3%] cursor-pointer"}
                                               onClick={() => handleEditClick(comment)}>수정</p>
                                            <button className={"mr-[3%] cursur-pointer"}
                                                    onClick={()=>handleDeleteClick(comment.commentId)}>삭제
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mr-[3%] invisible">수정</div>
                                            <div className="mr-[3%] invisible">삭제</div>
                                        </>
                                    )}
                                </SubDiv>
                            </SubWrapper>
                            <p>{FormatDate(comment.createdDate)}</p>
                        </SubContainer>
                    </CommentContainer>
                ))}

                {/* 댓글 입력 부분 */}
                <InputContainer>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="modal-input shadow-custom-inner border-b-2 rounded-xl"
                        placeholder="댓글을 입력하세요"
                    />
                    <Submit onClick={handleSubmit}><Message fill={"black"}/></Submit>
                </InputContainer>

            </div>
        </div>
    );
};

export default Modal;
