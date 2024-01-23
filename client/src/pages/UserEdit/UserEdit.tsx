import logo from '@/assets/sample1.jpg'
import {
    Container,
    Input,
    ProfileImg,
    ProfileWrapper,
    StyleLink, SubContainer, Submit,
    Title,
    Wrapper,
    Wrapper2, Wrapper3
} from "@/pages/UserEdit/styles";
import {Link} from "react-router-dom"

const UserEdit = () => {
    return (
        <div>
            <Container>
                {/* 하단의 헤더 마진값은 추후에 조정해야 한다. */}

                {/* Profile IMG */}
                <ProfileWrapper>
                    <ProfileImg
                        src={logo}
                        alt="Logo"
                    />
                </ProfileWrapper>

                {/* Line under profile img */}
                <svg
                    viewBox="0 0 385 1"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    className='mb-[5%]'
                >
                    <line x1="-4.37114e-8" y1="0.500031" x2={385} y2="0.499997" stroke="black"/>
                </svg>

                {/* nickname and intro */}
                <Wrapper2>
                    <Title>닉네임</Title>
                    <Input type="text"/>
                </Wrapper2>
                <Wrapper2>
                    <Title>소개</Title>
                    <Input type="text"/>
                </Wrapper2>
                <Wrapper3>
                    <Submit>수정</Submit>
                </Wrapper3>

                {/* password change and user withdrawal */}
                <SubContainer>
                    <Wrapper>
                        <StyleLink to="/passwordChange">비밀번호 변경</StyleLink>
                    </Wrapper>
                    <Wrapper>
                        <StyleLink to="/withdrawal">회원탈퇴</StyleLink>
                    </Wrapper>
                </SubContainer>
            </Container>
        </div>
    )
}

export default UserEdit;
