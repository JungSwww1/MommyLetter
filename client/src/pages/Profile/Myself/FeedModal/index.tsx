import logo from "@/assets/images/basicprofile.jpeg"
import React, {ReactNode, useEffect, useState} from 'react';
import './index.css'
import {BoardProps, CommentProps} from "@/pages/type/types";
import {getAllCommentsAPI} from "@/apis/Comments/CommentAPI";
import {countBoardLike, getOneBoardAPI} from "@/apis/Board/boardApi";
import {
    CommentContainer,
    ContextContainer,
    HashtagContainer,
    Layout,
    LikeIconContainer,
    PhotoContainer,
    TitleContainer, TitleWrapper,
    CreatedDate,
    ButtonWrapper,
    TitleRightWrapper,
    ThreeDot, CommentWrapper
} from "@/pages/Profile/Myself/FeedModal/styles";

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
                    <div className="flex">
                        <form method="dialog" >
                            <button id="closeBtn" className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        </form>
                        {writeButton}
                    </div>
                    {/*{children}*/}

                    <Layout>
                        <TitleContainer>
                            <TitleWrapper>
                                <img src={board?.accountSimpleReponse.profilePhoto ? `/profileimages/${board.accountSimpleReponse.profilePhoto.substring(88)}` : logo}
                                     alt="Logo"
                                     className={"w-[50px] h-[50px] rounded-full"}
                                />
                                <p className={"text-[16px] font-bold"}>{board?.accountSimpleReponse.nickname}</p>
                            </TitleWrapper>
                        </TitleContainer>

                        <ContextContainer>
                            <p className="text-[100%] whitespace-normal break-words">
                                {`${board?.content}`}
                            </p>
                        </ContextContainer>

                        <PhotoContainer>
                            {board?.photoList.map((photo, index) =>{
                                return(
                                    <div key={index} className="m-2" style={{width: 'calc(33.333% - 1rem)', float: 'left'}}>
                                        <img src={`/boardimages/${photo.path.substring(72)}`} alt={`Photo ${index + 1}`}
                                             className={"w-full h-full object-cover"}/>
                                    </div>
                                )
                            })}
                        </PhotoContainer>

                        <HashtagContainer>
                            {board?.hashTagList.map((hashtag, index) => (
                                <p className="mr-[1.5%]" key={index}>#{hashtag.content}</p>
                            ))}
                        </HashtagContainer>

                        <LikeIconContainer>
                            <p className={"text-[90%] font-bold my-auto"}>좋아요 {countLike}개</p>
                        </LikeIconContainer>

                        <CommentContainer>
                            {comments.map((comment, index) => (
                                <div key={comment.commentId}>
                                    <CommentWrapper key={index}>
                                        <div className={"flex w-[30%]"}>
                                            <p className="text-[90%] font-bold">{comment.nickname}</p>
                                        </div>
                                        <div className={"flex w-[75%]"}>
                                            <p className="text-[80%]">{comment.content}</p>
                                        </div>
                                    </CommentWrapper>
                                </div>
                            ))}
                        </CommentContainer>
                    </Layout>
                </div>
        </div>
    );
};


export default BottomUpModal;