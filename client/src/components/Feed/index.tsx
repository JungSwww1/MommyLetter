import {
    CommentContainer,
    ContextContainer,
    HashtagContainer,
    Layout,
    LikeIconContainer,
    PhotoContainer,
    TitleContainer, TitleWrapper
} from "@/components/Feed/styles";
import logo from '@/assets/images/sample1.jpg'
import {localFunction} from "@/components/Feed/ApiFunction";
import {useEffect, useState} from "react";
import MultiMessage from "@/assets/icons/multiMessage";
import ThreeDotMenu from "@/assets/icons/ThreeDotMenu";
import FeedHeartButton from "@/assets/icons/FeedHeartButton";
import FeedMessage from "@/assets/icons/FeedMessage";
import {Link} from "react-router-dom";

interface board {
    boardId: number;
    content: string;
    createdDate: string;
    hashTagList: string[];
    photoList: string[];
    updatedDate: string;
    userId: number;
}
interface MainFeedProps {
    board: board;
}

interface likedata {
    boardId: number;
    userId: number;
}

const MainFeed: React.FC<MainFeedProps>  = ({board}) => {
    const createdDateString : string = board.createdDate
    const createdDate:Date = new Date(createdDateString)
    const year: number = createdDate.getFullYear();
    const month: number = createdDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const day: number = createdDate.getDate();
    const formattedDate: string = `${year}년 ${month}월 ${day}일`;

    //좋아요 버튼 용도
    const likeData: likedata = {
        boardId: board.boardId,
        userId: board.userId,
    };

    return (
        <Layout>
            <TitleContainer>
                <TitleWrapper>
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px] rounded-full"}/>
                    <p className={"text-[16px] font-bold"}>{`${board.userId}`}</p>
                </TitleWrapper>
                <div>
                    <p>{formattedDate}</p>
                    <p>icon area</p>
                </div>
            </TitleContainer>

            <ContextContainer>
                <p className="line-clamp-3">
                    {`${board.content}`}
                </p>
            </ContextContainer>

            <PhotoContainer>
                <div className="w-[60%] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"max-h-[200px]"}/>
                </div>
                <div className="h-200[px] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"max-w-[100%] max-h-[200px]"}/>
                </div>
                <div className="h-200[px] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
                </div>
            </PhotoContainer>
            <PhotoContainer>
                {board.photoList.map((photo, index) => (
                    <div key={index} className="m-2" style={{ width: 'calc(33.333% - 1rem)', float: 'left' }}>
                        <img src={photo} alt={`Photo ${index + 1}`} className={"w-full h-full object-cover"}/>
                    </div>
                ))}
            </PhotoContainer>



            <HashtagContainer>
                {board.hashTagList.map((hashtag, index) => (
                    <p key={index}>#{hashtag}</p>
                ))}
            </HashtagContainer>

            <LikeIconContainer>
                <p className={"text-[13px] font-bold"}>좋아요 10개</p>
                <ButtonWrapper>
                    <FeedHeartButton likedata={likeData}/>
                    <Link className={"mt-[8%] h-[90%]"} to={"/message"}><MultiMessage/></Link>
                    <Link className={"mt-[8%] h-[90%]"} to={"/message"}><FeedMessage/></Link>
                </ButtonWrapper>


            </LikeIconContainer>

            <CommentContainer>
                <p className="text-[90%] font-bold">닉네임</p>
                <p className="w-[75%] text-[80%] truncate">댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글</p>
            </CommentContainer>
        </Layout>
    )
}

export default MainFeed