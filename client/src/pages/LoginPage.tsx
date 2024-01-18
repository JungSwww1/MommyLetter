import {useState} from "react";
import {Link, useNavigate } from "react-router-dom"
import logo from '@/assets/logo512.png'
const LoginPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [autoLogin, setAutoLogin] = useState(false)

    // 회원가입 버튼 클릭 시
    const userRegist = ()=> {
        navigate("/signup")
    }
    const loginFunc = () => {
        console.log(id);
        console.log(password);
    }
    return (
        <div>
            {/*아래는 로고 들어갈 영역*/}
            <img src={logo}
                 alt="Logo"
                 className="w-[183px] h-[183px] relative left-[39.23%] top-[120px]"
            />
            {/*아이디 입력*/}
            <input
                type="text"
                placeholder={"아이디를 입력해주세요"}
                onChange={e => setId(e.target.value)}
                className="w-[325px] h-9 absolute left-[30.88%] top-[350px] text-[15px] text-left text-[#a0a0a0]
                           border-2 text-center rounded-[6px]"
            />

            {/*비밀번호 입력*/}
            <input
                type="password"
                placeholder={"비밀번호를 입력해주세요"}
                onChange={e => setPassword(e.target.value)}
                className="w-[325px] h-9 absolute left-[30.88%] top-[400px] text-[15px] text-left text-[#a0a0a0]
                           border-2 text-center rounded-[6px]"
            />

            {/*로그인 버튼*/}
            <button
                onClick={loginFunc}
                className="w-[325px] h-9 absolute left-[30.88%] top-[470px] text-[15px] text-left text-[#a0a0a0]
                           border-2 text-center bg-[#FF78E9] text-white rounded-[6px]"
            >
                로그인
            </button>

            {/* 자동 로그인 체크박스 */}
            <input
                type="checkbox"
                onChange={(e) => setAutoLogin(e.target.checked)}
                className="absolute left-[30.88%] top-[530px]"
            />
            <p className="absolute left-[33%] top-[526px] text-[13px] text-left text-[#a0a0a0]">
                자동로그인
            </p>

            {/*아이디 찾기*/}
            <Link to="/findId" className="absolute left-[50%] top-[526px] text-[13px] text-left text-[#a0a0a0]">
                아이디 찾기
            </Link>

            {/*비밀번호 찾기*/}
            <Link to="/findPassword" className="absolute left-[59.5%] top-[526px] text-[13px] text-left text-[#a0a0a0]">
                비밀번호 찾기
            </Link>

            {/*회원가입*/}
            <button className="w-[89px] h-[28px] absolute left-[59.5%] top-[560px] text-[15px] text-left text-[#a0a0a0]
                           border-2 text-center mt-[1%] bg-[#FF78E9] text-white rounded-[6px]"
                    onClick={userRegist}
            >
                회원가입
            </button>


        </div>
    )
}

export default LoginPage;