
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
        <div className="w-[850px] h-screen relative rounded-sm bg-white border border-white/10 min-h-[320px]
                        ">
                <img
                    src="image-1.png"
                    className="w-[848px] h-[60px] absolute left-[-1px] top-[-1px] object-cover"
                />
                <div className="w-[51px] h-10 absolute left-6 top-[5px] bg-[#ffa0a0]"/>
                <p className="absolute left-[29px] top-[5px] text-[15px] font-bold text-left text-white">LOGO</p>
                <p className="absolute left-[97px] top-[15px] text-[15px] font-bold text-left text-black">
                        산모그램
                </p>

            <div className="relative left-[25%] top-[-50px]">
                <p className="absolute left-[23%] top-[131px] text-xl font-bold text-left text-black">
                    회원가입
                </p>

                {/*이메일*/}
                <p className="absolute left-[25px] top-48 text-xl font-bold text-left text-black">이메일</p>
                <input type="text"
                       placeholder="이메일"
                       className="w-[163px] h-9 absolute left-[24px] top-[236px] text-[15px] border-2"
                />
                <p className="absolute left-[198px] top-[240px] text-[20px] text-base text-left text-black">@</p>
                <input type="text"
                       placeholder="example.com"
<<<<<<< Updated upstream
                       className="w-[163px] h-9 absolute left-[225px] top-[236px] text-[15px] border-2"
=======
                       className="w-[185px] h-9 absolute left-[225px] top-[236px] text-[15px] border-2"
>>>>>>> Stashed changes
                />
                <button onClick={checkEmail}
                        className="w-[97px] h-[36px] absolute left-6 top-[281px] bg-[#FF8282]
                                   text-[14px] text-white rounded-[6px]">중복확인
                </button>

                {/*닉네임*/}
                <p className="absolute left-[25px] top-[336px] text-xl font-bold text-left text-black">닉네임</p>
                <input type="text"
                       placeholder="닉네임을 입력해주세요"
                       className="w-[262px] h-9 absolute left-[24px] top-[381px] text-[15px] border-2"
                />
                <button onClick={checkID}
                        className="w-[97px] h-[36px] absolute left-[308px] top-[380px] bg-[#FF8282]
                                   text-[14px] text-white rounded-[6px]">중복확인
                </button>

                {/*비밀번호*/}
                <p className="absolute left-[25px] top-[482px] text-xl font-bold text-left text-black">
                    비밀번호
                </p>
                <input type="text"
                       placeholder="비밀번호를 입력해주세요"
                       className="w-[381px] h-9 absolute left-[24px] top-[535px] text-[15px] border-2"
                />
                <input type="text"
                       placeholder="비밀번호를 다시 입력해주세요"
                       className="w-[381px] h-9 absolute left-[24px] top-[583px] text-[15px] border-2"
                />

                <button onClick={register}
                        className="w-[150px] h-[36px] absolute left-[145px] top-[680px] bg-[#FF8282]
                                   text-[14px] text-white rounded-[6px]">회원가입
                </button>

            </div>
        </div>
    )
}

export default UserRegist;
