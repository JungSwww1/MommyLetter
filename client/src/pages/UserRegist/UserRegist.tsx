import {CheckButton, DefaultInput, PasswordInput, RegisterButton, Title} from "@/pages/UserRegist/styles";

const UserRegist =()=> {
    const checkID = () => {
        console.log("아이디 중복용")
    }
    const checkEmail = () => {
        console.log("이메일 중복용")
    }

    const register = () => {
        console.log("회원가입용")
    }
    return(
        <div>
                <img
                    src="image-1.png"
                    className="w-[848px] h-[60px] absolute left-[-1px] top-[-1px] object-cover"
                />
                <div className="w-[51px] h-10 absolute left-6 top-[5px] bg-[#ffa0a0]"/>
                <p className="absolute left-[29px] top-[5px] text-[15px] font-bold text-left text-white">LOGO</p>
                <p className="absolute left-[97px] top-[15px] text-[15px] font-bold text-left text-black">
                        산모그램
                </p>
            {/*  위는 헤더 아래는 내용  */}
            <div className="relative left-[25%] top-[-50px]">
                <Title className="left-[23%] top-[131px]">
                    회원가입
                </Title>

                {/*이메일*/}
                <Title className="left-[25px] top-48">이메일</Title>
                <DefaultInput type="text"
                       placeholder="이메일"
                       className="w-[163px] left-[24px] top-[236px]"
                />
                <Title className="left-[198px] top-[240px] text-[20px] text-base">@</Title>
                <DefaultInput type="text"
                       placeholder="example.com"
                       className="w-[180px] left-[225px] top-[236px]"
                />
                <CheckButton onClick={checkEmail}
                        className="left-6 top-[281px]">중복확인
                </CheckButton>

                {/*닉네임*/}
                <Title className="left-[25px] top-[336px]">닉네임</Title>
                <DefaultInput type="text"
                       placeholder="닉네임을 입력해주세요"
                       className="w-[262px] left-[24px] top-[381px]"
                />
                <CheckButton onClick={checkID}
                        className="left-[308px] top-[380px]">중복확인
                </CheckButton>

                {/*비밀번호*/}
                <Title className="left-[25px] top-[482px]">
                    비밀번호
                </Title>
                <PasswordInput type="text"
                       placeholder="비밀번호를 입력해주세요"
                       className="top-[535px]"
                />
                <PasswordInput type="text"
                       placeholder="비밀번호를 다시 입력해주세요"
                       className="top-[583px]"
                />

                <RegisterButton onClick={register}>
                    회원가입
                </RegisterButton>

            </div>
        </div>
    )
}

export default UserRegist;
