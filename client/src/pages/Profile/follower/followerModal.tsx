import {FC, useEffect, useState} from "react";
import {getFollowerAPI} from "@/apis/Follow/FollowAPI";
import './Modal.css'
import {CommentContainer, MainContainer, SubContainer, SubDiv, SubWrapper} from "@/components/Feed/CommentModal/styles";
import {useNavigate} from "react-router-dom";
import logo from "@/assets/images/basicprofile.jpeg";

interface ModalProps {
    onClose: () => void;
    userId : number;
}
interface follow {
    nickname: string;
    userId : number;
    profilePhoto:string;
}
const FollowerModal: FC<ModalProps>  = ({ onClose ,  userId }) => {
    const navigate = useNavigate()
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const getFollower = async () => {
            const response = await getFollowerAPI(userId);
            const followerData = response.followers
            setFollowers(followerData);
        };
        getFollower();
    }, []);

    useEffect(() => {
        // 컴포넌트 마운트 시 모달 보여주기
        setShowModal(true);
    }, []);

    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const handleBackdropClick1 = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const clickMove = (userId:number) => {
        navigate(`/profile/${userId}`)
    }

    return (
        <div>
            <div className={`modal-backdrop ${showModal ? 'show' : ''}`} onClick={handleBackdropClick1}>
                <div className={`modal-content3 scrollBar ${showModal ? 'show' : ''}`}>
                    <span className="modal-close" onClick={onClose}>&times;</span>
                    {followers.map((follow: follow, index) => (
                        <CommentContainer key={index}>
                            <MainContainer onClick={()=>clickMove(follow.userId)}>
                                <img src={follow.profilePhoto ? `/profileimages/${follow.profilePhoto.substring(88)}` : logo}
                                     alt="profilephoto"
                                     className = "w-[20%] mr-[5%] rounded-full"
                                />
                                <div className={"ml-[2%] mr-[3%]"}>{follow.nickname}</div>
                            </MainContainer>
                        </CommentContainer>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowerModal;
