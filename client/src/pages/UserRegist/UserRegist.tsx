import {
    CheckButton,
    DefaultInput,
    Layout,
    EmailInput,
    RegisterButton,
    Title,
    Container, EmailWrapper, RegistContainer, MainTitle, PasswordBlank
} from "@/pages/UserRegist/styles";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {setSignupUser} from "@/stores/User/authSlice";

const UserRegist =()=> {
    const dispatch = useDispatch();
    // 밑은 확인용. 차후에 지워야한다
    const { nickname: Storednickname, password: Storedpassword, email: Storedemail } = useSelector((state: RootState) => state.signup);

    // 회원가입 내용 받는 용도
    const [localNickname, setLocalNickname] = useState('')
    const [localPassword, setLocalPassword] =useState('')
    const [localEmail1, setLocalEmail1] = useState('')
    const [localEmail2, setLocalEmail2] = useState('')
    const localEmail : string = `${localEmail1}@${localEmail2}`

    // 비밀번호 일치 여부 용도, 8자리 이상
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordLengthValid, setPasswordLengthValid] = useState(true);
    useEffect(() => {
        // useEffect 내부에서 비밀번호 일치 여부를 지속적으로 확인
        setPasswordMatch(localPassword === confirmPassword);
        setPasswordLengthValid(localPassword.length >= 8);
    }, [localPassword, confirmPassword]);

    // 중복 확인 부분
    const checkID = () => {
        console.log("아이디 중복용")
    }
    const checkEmail = () => {
        console.log("이메일 중복용")
    }

    const register = () => {
        const userData={nickname:localNickname, password:localPassword, email:localEmail}
        dispatch(setSignupUser(userData));
        console.log("회원가입용")
    }

    return(
        <Layout>
            {/*<div>*/}
            {/*    {Storedpassword}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {Storedemail}*/}
            {/*</div>*/}
            {/*{Storednickname}*/}
            <MainTitle>회원가입</MainTitle>

            <Container>
                <Title>이메일</Title>
                <EmailWrapper>
                    <EmailInput type="text"
                                placeholder="이메일"
                                onChange={(e) => setLocalEmail1(e.target.value)}
                    />
                    <p className={"font-bold"}>@</p>
                    <EmailInput type="text"
                                placeholder="example.com"
                                onChange={(e) => setLocalEmail2(e.target.value)}
                    />
                </EmailWrapper>
                <CheckButton>중복확인</CheckButton>
            </Container>

            <Container>
                <Title>닉네임</Title>
                <DefaultInput type="text"
                              placeholder="닉네임을 입력해주세요"
                              onChange={(e) => setLocalNickname(e.target.value)}
                />
                <CheckButton>중복확인</CheckButton>
            </Container>

            <Container>
                <Title>비밀번호</Title>
                <DefaultInput type="password"
                              placeholder="비밀번호를 입력해주세요"
                              onChange={(e) => setLocalPassword(e.target.value)}
                />

                {localPassword ==='' ? (
                    <PasswordBlank>Password Message Area</PasswordBlank>
                ) : (
                    passwordLengthValid ? (
                        <div className={'text-green-500'}>8자리 이상입니다</div>
                    ) : (
                        <div className={'text-red-500'}>비밀번호는 8자리 이상으로 입력하세요.</div>
                    )
                )}

                <Title>비밀번호 확인</Title>
                <DefaultInput type="password"
                              placeholder="비밀번호를 다시 입력해주세요"
                              onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div>
                    {passwordMatch ? (
                        <PasswordBlank>Password Message Area</PasswordBlank>
                    ) :
                        <div className={"text-red-500"}>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    }

                </div>
            </Container>

            <RegistContainer>
                <RegisterButton onClick={register}>
                    회원가입
                </RegisterButton>
            </RegistContainer>
        </Layout>

    )
}

export default UserRegist;