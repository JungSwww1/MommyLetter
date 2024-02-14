    import logo from '@/assets/images/basicprofile.jpeg'
    import back from '@/assets/images/basicbackground.png'
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
    import UserDelete from "@/pages/UserEdit/UserDelete/UserDelete";
    import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
    import ProfilePhotoChange from "@/pages/UserEdit/PhotoChange/ProfilePhotoChange";
    import BackgroundPhotoChange from "@/pages/UserEdit/PhotoChange/BackgroundPhotoChange";


    const UserEdit = () => {
        MommyLetterWS.getInstance().getUserInfo(); //이거슨 localStorage에 있는거 가져오기용
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
        }, [localUserId]);

        const handleInputChange = (e:any, field:string) => {
            editEditedData({
                ...editedData,
                [field]: e.target.value,
            })
        }

        // profile photo change 이건 차후에 수정할 거
        const profileChange = () => {
            (document.getElementById(`my_modal_9`) as any).showModal();
        }
        // background photo change
        const backgroundChange = ()=>{
            (document.getElementById(`my_modal_10`) as any).showModal();
        }
        const pwdChange = () => {
            (document.getElementById('my_modal_1') as any).showModal()
        }
        const userDelete = () => {
            (document.getElementById('my_modal_2') as any).showModal()
        }

        const background = incomeData.backgroundPhoto
            ? `/backgroundimages/${incomeData.backgroundPhoto.substring(91)}`
            : back;
        const profile = incomeData.profilePhoto
            ? `/profileimages/${incomeData.profilePhoto.substring(88)}`
            : logo;
        return (
            <Layout>
                <Container>
                    {/* 하단의 헤더 마진값은 추후에 조정해야 한다. */}
                    <BackgroundContainer style={{backgroundImage: `url(${background})`}}>
                        {/* Profile IMG */}
                        <ProfileWrapper>
                            <ProfileImg
                                src={profile}
                                alt="profile"
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
                        <Wrapper onClick={userDelete}>
                            <StyleLink to="#">회원탈퇴</StyleLink>
                            <UserDelete userId={localUserId}/>
                        </Wrapper>
                    </SubContainer>
                    <Wrapper3>
                        <Submit onClick={edit}>수정</Submit>
                    </Wrapper3>
                </Container>
                <ProfilePhotoChange/>
                <BackgroundPhotoChange/>
            </Layout>
        )
    }

    export default UserEdit;
