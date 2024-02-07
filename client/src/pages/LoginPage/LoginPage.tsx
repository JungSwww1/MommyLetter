import {Main} from "@/pages/LoginPage/styles";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {loginAPI} from '@/apis/Auth/authAPI'
import MainLogo from "@/assets/icons/MainLogo";

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
            <div className={"invisible"}>Logo Fix</div>
            <div className={"flex justify-center mt-[17%] mb-[4%]"}>
                <MainLogo/>
            </div>
            <div className={"flex flex-col items-center mb-[8%]"}>
                <input placeholder="이메일을 입력해주세요"
                       className="w-[80%] p-3 pl-6 rounded-3xl mb-[4%] shadow-custom-inner"
                       onChange={e => setEmail(e.target.value)}
                />
                <input placeholder="비밀번호를 입력해주세요"
                       className="w-[80%] p-3 pl-6 rounded-3xl mb-[4%] shadow-custom-inner"
                       onChange={e => setPassword(e.target.value)}
                />
                <button onClick={loginFunc} className="btn border-[#533C00] w-[80%] p-3 bg-[#533C00] hover:bg-[#808080] text-[#FFF8EE] rounded-3xl shadow-custom-outer">로그인</button>
            </div>
            <div className={"flex flex-row justify-center mb-[8%]"}>
                <div className={"flex flex-row justify-evenly w-[18%] mr-[8%]"}>
                    <input type="checkbox" className="rounded-full mt-[5%]" onChange={(e) => setAutoLogin(e.target.checked)}/>
                    <p>자동로그인</p>
                </div>
                <div className={"flex flex-row justify-evenly w-[32%]"}>
                    <Link to={"/example"}>아이디 찾기</Link>
                    <p>|</p>
                    <Link to={"/example"}>비밀번호 찾기</Link>
                </div>
            </div>
            <div className={"flex justify-end w-[90%]"}>
                <button onClick={userRegist} className={"btn w-[30%] border-[#533C00] p-3 bg-[#533C00] hover:bg-[#808080] text-[#FFF8EE] rounded-3xl shadow-custom-outer"}>회원가입</button>
            </div>

        </Main>
    )
}

export default LoginPage;