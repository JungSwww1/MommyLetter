import logo from '@/assets/images/sample1.jpg'
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
import axios from "axios";
import {useEffect, useState} from "react";

const UserEdit = () => {
    // 처음 유저가 이 화면에 들어왔을 때, 유저 닉네임 및 자기 소개에 관해 렌더링 하는 페이지
    const [incomeData, setIncomeData] = useState({
        localNickname: '',
        localIntro: '',
    });

    useEffect(() => {
        // 컴포넌트가 마운트될 때 초기 데이터 로딩
        screenData();
    }, []);  // 빈 배열을 전달하여 한 번만 실행되도록 설정

    const screenData = () => {
        axios.get(`http://localhost:8080/auth/101`)
            .then(response => {
                const incomeData = response.data;
                setIncomeData({
                    localNickname: incomeData.nickname,
                    localIntro: incomeData.intro,
                });
                console.log('응답 데이터:', response.data);
            })
            .catch(error => {
                console.error('에러 발생:', error);
            });
    }

    const [editData, setEditData] = useState({
        nickname: '',
        intro: '',
    });

    const handleNicknameChange = (e:any) => {
        // 닉네임이 변경될 때 editData 업데이트
        setEditData({
            ...editData,
            nickname: e.target.value,
        });
    }

    const handleIntroChange = (e:any) => {
        // 소개가 변경될 때 editData 업데이트
        setEditData({
            ...editData,
            intro: e.target.value,
        });
    }

    const edit = () => {
        // 아래의 101 부분은 수정해야 합니다.
        axios.patch(`http://localhost:8080/auth/101`, editData)
            .then(response => {
                console.log('응답 데이터:', response.data);
            })
            .catch(error => {
                console.error('에러 발생:', error);
            });
    }
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
                    <Input type="text"
                           defaultValue={incomeData.localNickname}
                           onChange={handleNicknameChange}
                    />
                </Wrapper2>
                <Wrapper2>
                    <Title>소개</Title>
                    <Input type="text"
                           defaultValue={incomeData.localIntro}
                           onChange={handleIntroChange}
                    />
                </Wrapper2>
                <Wrapper3>
                    <Submit onClick={edit}>수정</Submit>
                </Wrapper3>

                {/* password change and User withdrawal */}
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
