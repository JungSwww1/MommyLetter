import {CheckButton, DefaultInput, PasswordInput, RegisterButton, Title} from "@/pages/UserRegist/styles";
import {useEffect, useState} from "react";

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

            {/*  위에 헤더 추가해야된다. 아래는 내용  */}
            <div className="relative left-[25%] top-[-50px]">
                <Title className="left-[23%] top-[131px]">
                    회원가입
                </Title>

                {/*이메일*/}
                <Title className="left-[3%] top-48">이메일</Title>
                <DefaultInput type="text"
                       placeholder="이메일"
                       className="w-[22%] left-[3%] top-[236px] mr-[0.1%]"
                />
                <DefaultInput type="text"
                       placeholder="example.com"
                       className="w-[24%] left-[30%] top-[236px] ml-[0.1%]"
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
                />
                <CheckButton onClick={checkID}
                        className="w-[13%] left-[42%] top-[380px]">중복확인
                </CheckButton>

                {/*비밀번호*/}
                <Title className="left-[3%] top-[482px]">
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
