import {CheckButton, DefaultInput, PasswordInput, RegisterButton, Title} from "@/pages/UserRegist/styles";
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

    // 비밀번호 일치 여부 용도
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    useEffect(() => {
        // useEffect 내부에서 비밀번호 일치 여부를 지속적으로 확인
        setPasswordMatch(localPassword === confirmPassword);
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
        <div>
            <div>
                {Storedpassword}
            </div>
                <div>
                {Storedemail}
                </div>
                {Storednickname}
            <div className="relative left-[25%] top-[-50px]">
                <Title className="left-[23%] top-[131px]">
                    회원가입
                </Title>

                {/*이메일*/}
                <Title className="left-[3%] top-48">이메일</Title>
                <DefaultInput type="text"
                       placeholder="이메일"
                       className="w-[22%] left-[3%] top-[236px] mr-[0.1%]"
                       onChange={(e)=>setLocalEmail1(e.target.value)}
                />
                <DefaultInput type="text"
                       placeholder="example.com"
                       className="w-[24%] left-[30%] top-[236px] ml-[0.1%]"
                       onChange={(e)=>setLocalEmail2(e.target.value)}

                />
                <Title className="w-[20%] left-[26.0%] top-[240px] text-[20px] text-base ml-[0.1%] mr-[0.1%]"
                >@</Title>
                <CheckButton onClick={checkEmail}
                        className="left-[3%] top-[281px]">중복확인
                </CheckButton>

                {/*닉네임*/}
                <Title className="left-[3%] top-[336px]">닉네임</Title>
                <DefaultInput type="text"
                       placeholder="닉네임을 입력해주세요"
                       className="w-[35%] left-[3%] top-[381px]"
                       onChange={(e)=>setLocalNickname(e.target.value)}

                />
                <CheckButton onClick={checkID}
                        className="w-[13%] left-[42%] top-[380px]">중복확인
                </CheckButton>

                {/*비밀번호*/}
                <Title className="left-[3%] top-[482px]">
                    비밀번호
                </Title>
                <PasswordInput type="password"
                       placeholder="비밀번호를 입력해주세요"
                       className="top-[535px]"
                       onChange={(e)=>setLocalPassword(e.target.value)}

                />
                <PasswordInput type="password"
                       placeholder="비밀번호를 다시 입력해주세요"
                       className="top-[583px]"
                       onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className={"top-[610px]"}>
                {!passwordMatch && (
                    <div className={"text-red-500"}>
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}
                </div>
                <RegisterButton onClick={register}>
                    회원가입
                </RegisterButton>
            </div>
        </div>
    )
}

export default UserRegist;
