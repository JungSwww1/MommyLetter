import {
    BackgroundImg,
    Button,
    ContentWrapper,
    Layout,
    ProfileContainer,
    SubProfileContainer, Title
} from "@/pages/Doctor/Applicant/styles";
import {
    Img,
} from "@/pages/Profile/Myself/styles";
import logo from "@/assets/images/sample1.jpg";

const ConsultApplicant = () => {
    return(
        <Layout>
            <BackgroundImg
                src={logo}
                alt="Logo"
            />

            {/* 사용자 프로필 부분 */}
            <ProfileContainer>
                <Img src={logo} alt="Logo"/>
                    <p className={"text-[20px]"}>고승민</p>
                    <div className={"font-bold"}>신청일 : 2024.01.01 월</div>

                    <SubProfileContainer>
                        <ContentWrapper>
                            <Title>나이</Title>
                            <p>30세</p>
                        </ContentWrapper>
                        <ContentWrapper>
                            <Title>나이</Title>
                            <p>900000-1111111</p>
                        </ContentWrapper>
                        <ContentWrapper>
                            <Title>전화번호</Title>
                            <p>010-1111-2222</p>
                        </ContentWrapper>
                        <ContentWrapper>
                            <Title>참고사항</Title>
                            <p>임신/해당없음</p>
                        </ContentWrapper>
                        <ContentWrapper>
                            <Title>진료 횟수</Title>
                            <p>3</p>
                        </ContentWrapper>
                        <ContentWrapper>
                            <Title>산모일기 제공</Title>
                            <p>동의</p>
                        </ContentWrapper>

                        <Button>산모일기</Button>
                        <Button>처방전</Button>
                    </SubProfileContainer>
            </ProfileContainer>
        </Layout>
    )
}

export default ConsultApplicant;
