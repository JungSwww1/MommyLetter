import {CheckBox, Img, Input, LoginButton, Main, RegisterButton, StyleLink} from "@/pages/LoginPage/styles";
import {useState} from "react";
import {useNavigate } from "react-router-dom"
import logo from '@/assets/images/logo_white.png'
import {loginAPI} from '@/apis/Auth/authAPI'

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [autoLogin, setAutoLogin] = useState(false)

    // 회원가입 버튼 클릭 시
    const userRegist = ()=> {
        navigate("/join")
    }
    const loginFunc = async () => {
        const loginInfo = {email, password};
        await loginAPI(loginInfo);
        navigate('/', {replace:true})
    }

    return (
        <Main>
            {/*아래는 로고 들어갈 영역*/}
            <Img src={logo} alt="Logo"/>
            {/*아이디 입력*/}
            <Input
                type="text"
                placeholder={"아이디를 입력해주세요"}
                onChange={e => setEmail(e.target.value)}
                className="top-[350px]"
            />

            {/*비밀번호 입력*/}
            <Input
                type="password"
                placeholder={"비밀번호를 입력해주세요"}
                onChange={e => setPassword(e.target.value)}
                className="top-[400px]"
            />

            {/*로그인 버튼*/}
            <LoginButton onClick={loginFunc}>
                로그인
            </LoginButton>

            {/* 자동 로그인 체크박스 */}
            <CheckBox
                type="checkbox"
                onChange={(e) => setAutoLogin(e.target.checked)}
            />
            <p className="absolute left-[33%] top-[526px] text-[13px] text-left text-[#a0a0a0]">
                자동로그인
            </p>

            {/*아이디 찾기*/}
            <StyleLink to="/findId" className="left-[50%]">
                아이디 찾기
            </StyleLink>

            {/*비밀번호 찾기*/}
            <StyleLink to="/findPassword" className="left-[59.5%]">
                비밀번호 찾기
            </StyleLink>

            {/*회원가입*/}
            <RegisterButton onClick={userRegist}>
                회원가입
            </RegisterButton>
        </Main>
    )
}

export default LoginPage;