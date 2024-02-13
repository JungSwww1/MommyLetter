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
import {useEffect, useState} from "react";
import {getFollowerAPI, getFollowingAPI} from "@/apis/Follow/FollowAPI";
import {getProfileAPI} from "@/apis/profile/ProfileAPI";
import {useNavigate} from "react-router-dom";
import Modal from "@/pages/Profile/following/followingModal";
import Modal1 from "@/pages/Profile/follower/followerModal";
import {ProfileProps} from "@/pages/type/types";


const UserProfile = () => {
    const navigate = useNavigate();
    //아래는 기본적인 유저 정보 가져오기 용도
    //localStorage에서 현재 사용 유저 가져오기
    const getAuthUser = () => {
        const authData = localStorage.getItem('Auth');
        if (authData) {
            const authObject = JSON.parse(authData);
            return authObject;
        }
        return 0;
    };
    const [authUser, setAuthUser] = useState(getAuthUser());
    // 프로필 정보 가져오기
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
            const data = await getProfileAPI(authUser.userId); // 예를 들어 사용자 ID가 101인 경우
            setProfileData(data);
        };
        fetchProfileData();
    }, [])


    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    console.log(profileData)
    const profileEdit = () => {
        navigate("/edit")
    }


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
                    // src={profileData.backgroundPhoto}
                    alt="Logo"
                />

                {/* 사용자 프로필 부분 */}
                <ProfileContainer>
                    <Img src={logo} alt="Logo"/>
                    {/*<Img src={profileData.profilePhoto} alt="Logo"/>*/}
                    <p className={"text-[20px]"}>{profileData.nickname}</p>
                    <p>{profileData.intro}</p>
                    <SubProfileContainer>
                        <div>
                            <p className={'text-[140%]'}>51</p>
                            <p>게시물</p>
                        </div>
                        <div onClick={toggleFollowerModal}>
                            <p className={'text-[140%]'}>{profileData.follower}</p>
                            <p>팔로워</p>
                            {showFollowerModal && <Modal1 onClose={toggleFollowerModal} userId={authUser.userId}/>}
                        </div>
                        <div onClick={toggleFollowingModal}>
                            <p className={'text-[140%]'}>{profileData.following}</p>
                            <p>팔로잉</p>
                            {showFollowingModal  && <Modal onClose={toggleFollowingModal} userId={authUser.userId}/>}
                        </div>
                    </SubProfileContainer>

                    <SubProfileContainer>
                        <ProfileButton onClick={profileEdit}>프로필 편집</ProfileButton>
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
