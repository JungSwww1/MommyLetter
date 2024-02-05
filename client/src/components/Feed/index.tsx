import {
    CommentContainer,
    ContextContainer,
    HashtagContainer,
    Layout,
    LikeIconContainer,
    PhotoContainer,
    TitleContainer, TitleWrapper,
    CreatedDate,
    ButtonWrapper
} from "@/components/Feed/styles";
import logo from '@/assets/images/sample1.jpg'
import {useEffect, useState} from "react";
import MultiMessage from "@/assets/icons/multiMessage";
import ThreeDotMenu from "@/assets/icons/ThreeDotMenu";
import FeedHeartButton from "@/assets/icons/FeedHeartButton";
import FeedMessage from "@/assets/icons/FeedMessage";
import {Link} from "react-router-dom";
import {countBoardLike} from "@/apis/Board/boardApi";
import Modal from "@/components/Feed/CommentModal/CommentModal";
import {getAllCommentsAPI} from "@/apis/Comments/CommentAPI";
import Test from "@/components/Feed/test";

interface board {
    boardId: number;
    content: string;
    createdDate: string;
    category:string;
    updatedDate: string;
    hashTagList: { content: string; }[];
    photoList: string[];
    accountSimpleReponse: {
        nickname: string;
        userId : number;
        profilePhoto: string;
    };
}
interface Comment {
    commentId: number;
    userId: number;
    content: string;
    createdDate: string;
    updatedDate: string;
    nickname: string;
}
interface MainFeedProps {
    board: board;
}

// 게시물 좋아요 및 댓글 좋아요는 차후에 localstorage에 있는 userId로 수정해야한다.
const MainFeed: React.FC<MainFeedProps>  = ({board}) => {
    //댓글 가져오는 용도
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await getAllCommentsAPI(board.boardId);
            setComments(commentsData);
        }
        fetchComments();
    }, [board.boardId]);


    //게시물 좋아요 버튼 용도
    const likeData = {
        boardId: board.boardId,
        userId : board.accountSimpleReponse.userId
    };

    // 게시물 좋아요 개수를 가져와서 상태 업데이트
    const [countLike, setCountLike] = useState<number>(0);
    useEffect(() => {
        const fetchLikeCount = async () => {
            const count = await countBoardLike(board.boardId);
            setCountLike(count);
        };
        fetchLikeCount();
    }, [board.boardId]);
    // 좋아요 실시간 반영 용도
    const handleLikeStatusChange = async (likedStatus:boolean) => {
        if(likedStatus) {
            setCountLike(countLike + 1); // 좋아요가 눌렸을 때
        } else {
            setCountLike(countLike > 0 ? countLike - 1 : 0); // 좋아요가 해제되었을 때
        }
    };

    //댓글용 모달 상태 관리
    const [showModal, setShowModal] = useState(false);
    // 모달을 표시하거나 숨기는 함수
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const toggleModal1 =() => {
        const modal = document.getElementById('my_modal_3');
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        } else {
            console.error('Element is not a dialog');
        }
    }

    return (
        <Layout>
            <TitleContainer>
                <TitleWrapper>
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px] rounded-full"}/>
                    <p className={"text-[16px] font-bold"}>{board.accountSimpleReponse.nickname}</p>
                </TitleWrapper>
                <div className={"justify-end"}>
                    <div className={"flex justify-end items-center"}>
                        <ThreeDotMenu/>
                    </div>
                    <CreatedDate>
                        {new Date(board.createdDate).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </CreatedDate>
                </div>
            </TitleContainer>

            <ContextContainer>
                <p className="text-[80%] whitespace-normal break-words">
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
                    <div key={index} className="m-2" style={{width: 'calc(33.333% - 1rem)', float: 'left'}}>
                        <img src={photo} alt={`Photo ${index + 1}`} className={"w-full h-full object-cover"}/>
                    </div>
                ))}
            </PhotoContainer>

            <HashtagContainer>
                {board.hashTagList.map((hashtag, index) => (
                    <p className="mr-[1.5%]" key={index}>#{hashtag.content}</p>
                ))}
            </HashtagContainer>

            <LikeIconContainer>
                <p className={"text-[13px] font-bold my-auto"}>좋아요 {countLike}개</p>
                <ButtonWrapper>
                    <FeedHeartButton likedata={likeData} onLikeStatusChange={handleLikeStatusChange}/>
                    <Link className={"mt-[8%] h-[90%]"} to={"#"} onClick={toggleModal1}><MultiMessage/></Link>
                    <Link className={"mt-[8%] h-[90%]"} to={"/message"}><FeedMessage/></Link>
                    {showModal && <Modal onClose={toggleModal} comments={comments} boardId={board.boardId}
                                         userId={board.accountSimpleReponse.userId}/>}

                    <Test onClose={toggleModal} comments={comments} boardId={board.boardId} userId={board.accountSimpleReponse.userId}/>

                </ButtonWrapper>
            </LikeIconContainer>
            <CommentContainer>
                {comments.slice(0, 1).map((comment, index) => (
                    <div key={index} className="flex flex-row mb-2 items-center">
                        <p className="text-[90%] font-bold mr-[3%]">{comment.nickname}</p>
                        <p className="w-[75%] text-[80%] truncate">{comment.content}</p>
                    </div>
                ))}
            </CommentContainer>


        </Layout>
    )
}

export default MainFeed