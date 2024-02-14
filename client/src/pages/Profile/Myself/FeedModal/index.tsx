import React, {ReactNode, useEffect, useState} from 'react';
import './index.css'
import {BoardProps, CommentProps} from "@/pages/type/types";
import {getAllCommentsAPI} from "@/apis/Comments/CommentAPI";
import {countBoardLike, getOneBoardAPI} from "@/apis/Board/boardApi";
import {ContextContainer} from "@/components/Feed/styles";

interface Props {
    children: ReactNode;
    writeButton: ReactNode | boolean;
    boardId:number;
}

const BottomUpModal = ({children, writeButton, boardId}: Props) => {
    //댓글 가져오는 용도
    const [comments, setComments] = useState<CommentProps[]>([])
    const [countComments, setCountComments] = useState<number>(0);
    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await getAllCommentsAPI(boardId);
            setComments(commentsData);
            setCountComments(commentsData.length);
        }
        fetchComments();
    }, [boardId]);

    // 게시물 좋아요 개수를 가져와서 상태 업데이트
    const [countLike, setCountLike] = useState<number>(0);
    useEffect(() => {
        const fetchLikeCount = async () => {
            const count = await countBoardLike(boardId);
            setCountLike(count);
        };
        fetchLikeCount();
    }, [boardId]);

    const fetchBoard = () => {
        const res =  getOneBoardAPI(boardId)
        if(res) {
            return res
        }
        return null;
    }
    const [board, setBoard] = useState<BoardProps>()
    useEffect(() => {
        const fetchBoard = async () => {
            const res = await getOneBoardAPI(boardId)
            setBoard(res)
        }
        fetchBoard()
    }, [boardId]);

    return (
        <div className="w-[100%] h-[100%]">
                <div className="modal-box bottom-sheet7 max-w-none max-w-full h-[100%] scrollBar">
                    <div className="flex justify-between">
                        <form method="dialog" >
                            <button id="closeBtn" className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        </form>
                        {writeButton}
                    </div>
                    {children}
                    <ContextContainer>
                        <p className="text-[100%] whitespace-normal break-words">
                            {board?.content}
                        </p>
                    </ContextContainer>
                </div>
        </div>
    );
};


export default BottomUpModal;