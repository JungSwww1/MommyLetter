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

interface Profile {
    userId:number;
    nickname:string;
    intro:string;
    backgroundPhoto:string;
    profilePhoto: string;
    follower:number;
    following:number;
}

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
    const [profileData, setProfileData] = useState<Profile>({
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
            const data = await getProfileAPI(101); // 예를 들어 사용자 ID가 101인 경우
            setProfileData(data);
        };
        fetchProfileData();
    }, [])


    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    console.log(profileData)
    const profileEdit = () => {
        navigate("/edit")
    }
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
                    <p className={"text-[20px]"}>{profileData.nickname}</p>
                    <p>{profileData.intro}</p>
                    <SubProfileContainer>
                        <div>
                            <p className={'text-[140%]'}>51</p>
                            <p>게시물</p>
                        </div>
                        <div>
                            <p className={'text-[140%]'}>{profileData.follower}</p>
                            <p>팔로워</p>
                        </div>
                        <div>
                            <p className={'text-[140%]'}>{profileData.following}</p>
                            <p>팔로잉</p>
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
