    import logo from '@/assets/images/sample1.jpg'
    import {
    BackgroundContainer,
    ButtonWrapper, CheckButton,
    Container, EditButton,
    Input,
    Layout,
    ProfileImg,
    ProfileWrapper,
    StyleLink, SubContainer, Submit,
    Title,
    Wrapper,
    Wrapper2, Wrapper3
} from "@/pages/UserEdit/styles";
    import {useEffect, useState} from "react";
    import {localFunction} from "@/pages/UserEdit/ApiFunction";
    import axios from "axios";
    import PasswordChange from "@/pages/UserEdit/PasswordChange/PasswordChange";


    const UserEdit = () => {
        const [localUserId, setLocalUserId] = useState(0)
        //아래는 무한 루프 방지 용도
        useEffect(() => {
            const getLocal = localStorage.getItem('Auth');
            if (getLocal !== null) {
                const userData = JSON.parse(getLocal);
                setLocalUserId(userData.userId);
            }
        }, []);

        const {nicknameStatus, incomeData,editEditedData, editedData, screenData, edit, checkNickname} = localFunction(localUserId)
        // 컴포넌트가 마운트될 때 초기 데이터 로딩
        useEffect(() => {
            screenData(localUserId);
        }, [localUserId]);  // 빈 배열을 전달하여 한 번만 실행되도록 설정

        const handleInputChange = (e:any, field:string) => {
            editEditedData({
                ...editedData,
                [field]: e.target.value,
            })
        }

        // profile photo change 이건 차후에 수정할 거
        const profileChange = () => {
            try {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.jpg, .png, .svg';
                fileInput.addEventListener('change', async (event) => {
                    const file = (event.target as HTMLInputElement).files?.[0];

                    if (file) {
                        const formData = new FormData();
                        formData.append('uploadFiles', file);

                        const response = await axios.post('백엔드_API_URL', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        console.log('백엔드 응답:', response.data);
                    }
                });
                fileInput.click();
            } catch (error) {
                console.error('프로필 이미지 업로드 중 오류 발생:', error);
            }
        }
        // background photo change
        const backgroundChange = ()=>{

        }
        const pwdChange = () => {
            (document.getElementById('my_modal_1') as any).showModal()
        }
        return (
            <Layout>
                <Container>
                    {/* 하단의 헤더 마진값은 추후에 조정해야 한다. */}
                    <BackgroundContainer style={{backgroundImage: `url(${logo})`}}>
                        {/* Profile IMG */}
                        <ProfileWrapper>
                            <ProfileImg
                                src={logo}
                                alt="Logo"
                            />
                        </ProfileWrapper>
                        <ButtonWrapper>
                            <EditButton onClick={profileChange}>프로필 사진 변경</EditButton>
                            <EditButton onClick={backgroundChange}>배경 사진 변경</EditButton>
                        </ButtonWrapper>
                        <div className={"invisible"}>Background fix</div>
                    </BackgroundContainer>
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
                        <div className={nicknameStatus === "checking" ? "invisible" : "visible"} style={{ color: nicknameStatus === "available" ? "blue" : "red" }}>
                            {nicknameStatus === "available" ? "사용 가능합니다" : "닉네임이 중복되었습니다"}
                        </div>
                        <CheckButton onClick={checkNickname}>중복 확인</CheckButton>
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
                        <Wrapper onClick={pwdChange}>
                            <StyleLink to="#">비밀번호 변경</StyleLink>
                            <PasswordChange userId={localUserId} nickname={incomeData.localNickname} intro={incomeData.localIntro}/>
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
