import logo from '@/assets/images/sample1.jpg'
import {
    BackgroundImg,
    Container,
    ContentContainer,
    ContentWrapper,
    Img,
    ProfileButton,
    ProfileContainer,
    SubProfileContainer
} from "@/pages/Profile/Myself/styles";
import {useNavigate, useParams} from "react-router-dom";
import {ProfileProps} from "@/pages/type/types";
import {getProfileAPI} from "@/apis/profile/ProfileAPI";
import {useEffect, useState} from "react";
import Modal1 from "@/pages/Profile/follower/followerModal";
import Modal from "@/pages/Profile/following/followingModal";

const UserProfile = () => {
    const navigate = useNavigate();
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const getAuthUser = () => {
        const authData = localStorage.getItem('Auth');
        if (authData) {
            const authObject = JSON.parse(authData);
            return authObject;
        }
        return 0;
    };
    const [authUser, setAuthUser] = useState(getAuthUser());
    const userId = useParams().userId
    const [profileData, setProfileData] = useState<ProfileProps>({
        userId:0,
        nickname:'',
        intro:'',
        backgroundPhoto:'',
        profilePhoto: '',
        follower:0,
        following:0
    })
    useEffect(()=>{
        const fetchProfileData = async () => {
            const userIdNumber = userId ? parseInt(userId, 10) : null;
            if (!userIdNumber) {
                console.log('userId가 유효한 숫자가 아닙니다.');
                return;
            }
            try {
                if(Number(userIdNumber) === Number(authUser.userId)) {
                    navigate(`/profile`)
                } else {
                    const data = await getProfileAPI(userIdNumber);
                    setProfileData(data);
                }
            } catch (error) {
                console.error('프로필 데이터를 가져오는 데 실패했습니다.', error);
                // 오류 처리 로직...
            }
        };
        fetchProfileData();
    }, [userId])

    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);

    // 팔로워 모달을 표시하거나 숨기는 함수
    const toggleFollowerModal = () => {
        setShowFollowerModal(!showFollowerModal);
    };

    // 팔로잉 모달을 표시하거나 숨기는 함수
    const toggleFollowingModal = () => {
        setShowFollowingModal(!showFollowingModal);
    };

    return (
        <div>
            {/* 본문 */}
            <Container>
                {/* 배경 사진 */}
                <BackgroundImg
                    src={logo}
                    alt="Logo"
                />

                {/* 사용자 프로필 부분 */}
                <ProfileContainer>
                    <Img src={logo} alt="Logo"/>
                    <p className={"text-[20px]"}>{userId}</p>
                    <p>{profileData.intro}</p>
                    <SubProfileContainer>
                        <div>
                            <p>51</p>
                            <p>게시물</p>
                        </div>
                        <div onClick={toggleFollowerModal}>
                            <p>{profileData.follower}</p>
                            <p>팔로워</p>
                            {showFollowerModal && <Modal1 onClose={toggleFollowerModal} userId={profileData.userId}/>}
                        </div>
                        <div onClick={toggleFollowingModal}>
                            <p>{profileData.following}</p>
                            <p>팔로잉</p>
                            {showFollowingModal  && <Modal onClose={toggleFollowingModal} userId={profileData.userId}/>}
                        </div>
                    </SubProfileContainer>

                    <SubProfileContainer>
                        <ProfileButton>프로필 편집</ProfileButton>
                        <ProfileButton>프로필 공유</ProfileButton>
                    </SubProfileContainer>

                    {/* 게시물 부분 */}
                    <ContentContainer>
                        {items.map((item, key) => (
                            <ContentWrapper
                                key={key}
                            >
                                {item}
                            </ContentWrapper>
                        ))}
                    </ContentContainer>
                </ProfileContainer>
            </Container>
        </div>
    );
};

export default UserProfile;
