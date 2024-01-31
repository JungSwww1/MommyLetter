    import logo from '@/assets/images/sample1.jpg'
    import {
        Container,
        Input,
        Layout,
        ProfileImg,
        ProfileWrapper,
        StyleLink, SubContainer, Submit,
        Title,
        Wrapper,
        Wrapper2, Wrapper3
    } from "@/pages/UserEdit/styles";
    import {getUserData, updateUser} from "@/apis/User/userApi"
    import {useEffect, useState} from "react";
    import {localFunction} from "@/pages/UserEdit/ApiFunction";


    const UserEdit = () => {

        const {incomeData, editIncomeData, screenData, edit} = localFunction()

        // 컴포넌트가 마운트될 때 초기 데이터 로딩
        useEffect(() => {
            screenData();
        }, []);  // 빈 배열을 전달하여 한 번만 실행되도록 설정

        // 아래는 input값이 변화함에 따라 해당 nickname, intro 변경
        const handleInputChange = (e:any, field:string) => {
            editIncomeData({
                ...incomeData,
                [field]: e.target.value,
            });
        }

        return (
            <Layout>
                <Container>
                    {/* 하단의 헤더 마진값은 추후에 조정해야 한다. */}

                    {/* Profile IMG */}
                    <ProfileWrapper>
                        <ProfileImg
                            src={logo}
                            alt="Logo"
                        />
                    </ProfileWrapper>
                    <div className={"flex flex-row justify-around"}>
                        <button>프로필 사진 변경</button>
                        <button>배경 사진 변경</button>
                    </div>
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
                        <Input type="text"
                               defaultValue={incomeData.localNickname}
                               onChange={(e) => handleInputChange(e, 'nickname')}
                        />
                        <button>중복 확인</button>
                    </Wrapper2>
                    <Wrapper2>
                        <Title>소개</Title>
                        <Input type="text"
                               defaultValue={incomeData.localIntro}
                               onChange={(e) => handleInputChange(e, 'intro')}
                        />
                    </Wrapper2>

                    {/* password change and User withdrawal */}
                    <SubContainer>
                        <Wrapper>
                            <StyleLink to="/passwordChange">비밀번호 변경</StyleLink>
                        </Wrapper>
                        <Wrapper>
                            <StyleLink to="/withdrawal">회원탈퇴</StyleLink>
                        </Wrapper>
                    </SubContainer>
                    <Wrapper3>
                        <Submit onClick={edit}>수정</Submit>
                    </Wrapper3>
                </Container>
            </Layout>
        )
    }

    export default UserEdit;
