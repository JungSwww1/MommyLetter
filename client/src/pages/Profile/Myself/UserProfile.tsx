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

const UserProfile = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
                    <p className={"text-[20px]"}>고승민</p>
                    <p>고추장 아빠</p>
                    <SubProfileContainer>
                        <div>
                            <p>51</p>
                            <p>게시물</p>
                        </div>
                        <div>
                            <p>299</p>
                            <p>팔로워</p>
                        </div>
                        <div>
                            <p>280</p>
                            <p>팔로잉</p>
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
