import {FC, useEffect, useState} from "react";
import {getFollowingAPI} from "@/apis/Follow/FollowAPI";
import '@/pages/Profile/following/Modal.css'
import {CommentContainer, MainContainer, SubContainer, SubDiv, SubWrapper} from "@/components/Feed/CommentModal/styles";
import {useNavigate} from "react-router-dom";

interface ModalProps {
    onClose: () => void;
    userId : number;
}
interface follow {
    nickname: string;
    userId : number;
    profilePhoto:string;
}
const FollowingModal: FC<ModalProps>  = ({ onClose ,  userId }) => {
    const navigate = useNavigate()
    const [followings, setFollowings] = useState([]);
    useEffect(() => {
        const getFollowing = async () => {
            const response = await getFollowingAPI(userId);
            const followingData = response.following
            setFollowings(followingData);
        };
        getFollowing();
    }, []);

    useEffect(() => {
        // 컴포넌트 마운트 시 모달 보여주기
        setShowModal(true);
    }, []);

    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const clickMove = (userId:number) => {
        navigate(`/profile/${userId}`)
    }
    return (
        <div>
            <div className={`modal-backdrop ${showModal ? 'show' : ''}`} onClick={handleBackdropClick}>
                <div className={`modal-content2 scrollBar ${showModal ? 'show' : ''}`}>
                    <span className="modal-close" onClick={onClose}>&times;</span>
                    {followings.map((follow: follow, index) => (
                        <CommentContainer key={index}>
                            <MainContainer onClick={()=>clickMove(follow.userId)}>
                                <div className={"ml-[2%] mr-[3%]"}>{follow.nickname}</div>
                            </MainContainer>
                        </CommentContainer>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowingModal;
