import React, { FC, useEffect, useState } from 'react';
import './Modal.css';
import {CommentProps} from "@/pages/type/types";
import {getAllCommentsAPI} from "@/apis/Comments/CommentAPI";


interface ModalProps {
    onClose: () => void;
    boardId: number;
}

interface Comment {
    commentId: number;
    userId: number;
    content: string;
    createdDate: string;
    updatedDate: string;
    nickname: string;
}

const Modal: FC<ModalProps> = ({ onClose , boardId}) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    useEffect(() => {
        // 컴포넌트 마운트 시 모달 보여주기
        setShowModal(true);
    }, []);

    const [comments, setComments] = useState<CommentProps[]>([])
    const [countComments, setCountComments] = useState<number>(0);
    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await getAllCommentsAPI(boardId);
            const sortedComments = commentsData.sort((a:any, b:any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
            setComments(sortedComments);
            setCountComments(sortedComments.length);
        }
        fetchComments();
    }, [boardId]);

    return (

        <div className={`modal-backdrop ${showModal ? 'show' : ''}`}  onClick={handleBackdropClick}>
            <div className={`modal-content11 scrollBar ${showModal ? 'show' : ''}`}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                {/* 이 위까지 모달 작동을 위한 CSS 부분 */}

                {boardId}
            </div>
        </div>
    );
};

export default Modal;
