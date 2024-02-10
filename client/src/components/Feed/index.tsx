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
} from "@/components/Feed/styles";
import logo from '@/assets/images/sample1.jpg'
import {useEffect, useRef, useState} from "react";
import MultiMessage from "@/assets/icons/multiMessage";
import ThreeDotMenu from "@/assets/icons/ThreeDotMenu";
import FeedHeartButton from "@/assets/icons/FeedHeartButton";
import {Link} from "react-router-dom";
import {countBoardLike, deleteBoardAPI} from "@/apis/Board/boardApi";
import Modal from "@/components/Feed/CommentModal/CommentModal";
import {getAllCommentsAPI} from "@/apis/Comments/CommentAPI";
import {FormatDate} from "@/components/Feed/LocalFunction";
import Menu from "@/components/Feed/FeedMenuModal/FeedMenuModal";
import "@/components/Feed/FeedMenuModal/Modal.css"
import {FeedEdit} from "@/components/Feed/FeedEditModal/FeedEdit";
import {BoardProps, CommentProps} from "@/pages/type/types";

interface MainFeedProps {
    authUserId : number;
    board: BoardProps;
}

const MainFeed: React.FC<MainFeedProps>  = ({authUserId, board}) => {
    //댓글 가져오는 용도
    const [comments, setComments] = useState<CommentProps[]>([])
    const [countComments, setCountComments] = useState<number>(0);
    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await getAllCommentsAPI(board.boardId);
            const sortedComments = commentsData.sort((a:any, b:any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
            setComments(sortedComments);
            setCountComments(sortedComments.length);
        }
        fetchComments();
    }, [board.boardId]);


    //게시물 좋아요 버튼 용도
    const likeData = {
        boardId: board.boardId,
        userId : authUserId
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

    // 메뉴용 모달 상태 관리
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    // 수정하기와 삭제하기에 대한 함수 정의
    const handleEdit = () => {
        (document.getElementById('my_modal_2') as any).showModal()
    };
    const handleDelete = async () => {
        await deleteBoardAPI(board.boardId)
        // await window.location.reload()
    };

    return (
        <Layout>
            <TitleContainer>
                <TitleWrapper>
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px] rounded-full"}/>
                    <p className={"text-[16px] font-bold"}>{board.accountSimpleReponse.nickname}</p>
                </TitleWrapper>
                <TitleRightWrapper>
                    <div className={"flex justify-end items-center relative"}>
                        {Number(authUserId) === Number(board.accountSimpleReponse.userId) ? (
                            <>
                            <button onClick={toggleMenu}><ThreeDotMenu/></button>
                            {showMenu && (
                                <div className="MenuModal absolute top-full right-0 z-100">
                                    <Menu onEdit={handleEdit} onDelete={handleDelete} onClose={toggleMenu} />
                                </div>
                            )}
                            </>
                            ) : (<></>)}
                    </div>
                    <CreatedDate>
                        {FormatDate(board.createdDate)}
                    </CreatedDate>
                </TitleRightWrapper>
            </TitleContainer>

            <ContextContainer>
                <p className="text-[100%] whitespace-normal break-words">
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
                {board.photoList.map((photo, index) =>(
                    <div key={index} className="m-2" style={{width: 'calc(33.333% - 1rem)', float: 'left'}}>
                        <img src={photo.path} alt={`Photo ${index + 1}`} className={"w-full h-full object-cover"}/>
                    </div>
                ))}
            </PhotoContainer>

            <HashtagContainer>
                {board.hashTagList.map((hashtag, index) => (
                    <p className="mr-[1.5%]" key={index}>#{hashtag.content}</p>
                ))}
            </HashtagContainer>

            <LikeIconContainer>
                <p className={"text-[90%] font-bold my-auto"}>좋아요 {countLike}개</p>
                <ButtonWrapper>
                    <FeedHeartButton likedata={likeData} onLikeStatusChange={handleLikeStatusChange}/>
                    <Link className={"ml-[15%] mt-[8%] h-[90%]"} to={"#"} onClick={toggleModal}><MultiMessage/></Link>
                    {showModal && <Modal onClose={toggleModal} boardId={board.boardId}
                                         userId={authUserId}/>}
                </ButtonWrapper>
            </LikeIconContainer>

            <CommentContainer>
                {comments.slice(0, 1).map((comment, index) => (
                    <div key={comment.commentId} onClick={toggleModal}>
                        <CommentWrapper key={index}>
                            <p className="text-[90%] font-bold mr-[3%]">{comment.nickname}</p>
                            <p className="w-[75%] text-[80%] truncate">{comment.content}</p>
                        </CommentWrapper>
                        <Link to={"#"} className={"text-[80%]"}>댓글 {countComments}개 모두 보기</Link>
                    </div>
                ))}
            </CommentContainer>
            <FeedEdit boardId={board.boardId} boardContent={board.content}
                      boardAccess={board.access} boardCategory={board.category}
                      boardHashTagList={board.hashTagList}
            />
        </Layout>
    )
}

export default MainFeed