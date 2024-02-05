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
// import {setSignupUser} from "@/stores/User/authSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {emailCheckAPI, nicknameCheck} from "@/apis/User/userApi";
import {registAPI} from "@/apis/Auth/authAPI";

const UserRegist =()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 밑은 확인용. 차후에 지워야한다
    const { nickname: Storednickname, password: Storedpassword, email: Storedemail } = useSelector((state: RootState) => state.signup);

    // 회원가입 내용 받는 용도
    const [pressNickname, setPressNickname] = useState(false)
    const [possibleNickname, setPossibleNickname] = useState(false)
    const [pressEmail, setPressEmail] = useState(false)
    const [possibleEmail, setPossibleEmail] = useState(false)

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
    const checkID = async () => {
        const isAvailable = await nicknameCheck(localNickname)
        if(isAvailable && localNickname !== '') {
            setPossibleNickname(true)
            setPressNickname(true)
            alert("사용 가능한 닉네임입니다")
        } else if(localNickname ==='') {
          alert("닉네임을 입력하세요")
        } else {
            alert("이미 사용 중인 닉네임입니다.")
        }
        console.log("아이디 중복용")
    }
    const checkEmail = async () => {
        const isAvailable = await emailCheckAPI(localEmail)
        if((localEmail1 !== '' || localEmail2 !== '') && isAvailable) {
            setPossibleEmail(true)
            setPressEmail(true)
            alert("사용 가능한 이메일입니다.")
        } else if (localEmail1 === '' || localEmail2 === '') {
            alert("이메일을 입력하세요")
        } else {
            alert("이미 사용 중인 이메일입니다")
        }
        console.log("이메일 중복용")
    }

    const register = async () => {
        const userData={nickname:localNickname, password:localPassword, email:localEmail}
        // dispatch(setSignupUser(userData));
        // API
        if(pressNickname && pressEmail && possibleNickname && possibleEmail && passwordMatch && localPassword !== '') {
            await registAPI(userData)
            await navigate("/")
            setPressEmail(false)
            setPressNickname(false)
        }else {
            if (!pressNickname) {alert("닉네임 중복 버튼을 눌러주세요");}
            if (!pressEmail) {alert("이메일 중복 버튼을 눌러주세요");}
            if (!passwordMatch) {alert("비밀번호가 일치하지 않습니다.");}
            if (localPassword === '') {alert("비밀번호는 공백이 불가합니다.")}
        }
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
                <CheckButton onClick={checkEmail}>중복확인</CheckButton>
            </Container>

            <Container>
                <Title>닉네임</Title>
                <DefaultInput type="text"
                              placeholder="닉네임을 입력해주세요"
                              onChange={(e) => setLocalNickname(e.target.value)}
                />
                <CheckButton onClick={checkID}>중복확인</CheckButton>
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
