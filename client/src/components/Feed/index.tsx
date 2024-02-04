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
import Modal from "@/components/Feed/FeedModal";
import hashTag from "@/components/HashTag";
import {getAllCommentsAPI} from "@/apis/Comments/CommentAPI";


interface board {
    boardId: number;
    content: string;
    createdDate: string;
    category:string;
    updatedDate: string;
    hashTagList: string[];
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
    // 추가: 작성자의 닉네임을 나타내는 필드가 필요하다면 여기에 추가
    nickname?: string;
}
interface MainFeedProps {
    board: board;
}

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


    //좋아요 버튼 용도
    const likeData = {
        boardId: board.boardId,
        userId : board.accountSimpleReponse.userId
    };

    // 좋아요 개수를 가져와서 상태 업데이트
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
                        {new Date(board.createdDate).toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'})}
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
                <p className={"text-[13px] font-bold my-auto"}>좋아요 {countLike}개</p>
                <ButtonWrapper>
                    <FeedHeartButton likedata={likeData} onLikeStatusChange={handleLikeStatusChange}/>
                    <Link className={"mt-[8%] h-[90%]"} to={"#"} onClick={toggleModal}><MultiMessage/></Link>
                    <Link className={"mt-[8%] h-[90%]"} to={"/message"}><FeedMessage/></Link>
                </ButtonWrapper>
                {/* showModal 상태에 따라 Modal 컴포넌트를 조건부 렌더링 */}
                {showModal && <Modal onClose={toggleModal} comments={comments} boardId={board.boardId} userId={board.accountSimpleReponse.userId} />}
            </LikeIconContainer>

            <CommentContainer>
                {comments.slice(0, 1).map((comment, index) => (
                    <div key={index} className="flex flex-row mb-2 items-center">
                        <p className="text-[90%] font-bold mr-[3%]">{comment.userId}</p>
                        <p className="w-[75%] text-[80%] truncate">{comment.content}</p>
                    </div>
                ))}
            </CommentContainer>


        </Layout>
    )
}

export default MainFeed