import logo from '@/assets/sample1.jpg'
import {ProfileImg} from "@/pages/UserEdit/styles";
import {useEffect, useState} from "react";
const UserEdit = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-col items-center bg-amber-200">
                111
                <div className="bg-gray-300">222</div>
                <div className="flex justify-center">
                    <ProfileImg
                        src={logo}
                        alt="Logo"
                    />
                </div>
            </div>

        </div>
        // <div className="w-[850px] h-[700px] relative overflow-hidden rounded-sm bg-white border border-white/10">
            //
            //     <div className="w-[51px] h-10 absolute left-[21px] top-[58px] bg-[#ffa0a0]" />
            //     <p className="absolute left-[26px] top-[69px] text-[15px] font-bold text-left text-white">LOGO</p>
            //     <p className={`absolute left-[94px] top-[69px] text-[15px] font-bold text-left text-black`}>
            //         회원정보 수정
            //     </p>
            //     <p className="absolute left-[379px] top-[69px] text-[15px] font-bold text-left text-black">
            //         완료
            //     </p>
            //
            //     <p className="absolute left-8 top-[344px] text-[15px] text-left text-black">닉네임</p>
            //     <p className="absolute left-8 top-96 text-[15px] text-left text-black">소개</p>
            //     <p className="absolute left-[42px] top-[499px] text-[15px] text-left text-[#0029ff]">
            //         비밀번호 변경
            //     </p>
            //     <p className="absolute left-[42px] top-[534px] text-[15px] text-left text-[#0029ff]">회원탈퇴</p>
            //
            //     <svg
            //         width={385}
            //         height={1}
            //         viewBox="0 0 385 1"
            //         fill="none"
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="absolute left-[21px] top-[309px]"
            //         preserveAspectRatio="xMidYMid meet"
            //     >
            //         <line x1="-4.37114e-8" y1="0.500031" x2={385} y2="0.499997" stroke="black" />
            //     </svg>
            //     <svg
            //         width={281}
            //         height={1}
            //         viewBox="0 0 281 1"
            //         fill="none"
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="absolute left-[115.25px] top-[368.25px]"
            //         preserveAspectRatio="xMidYMid meet"
            //     >
            //         <line x1="2.18557e-8" y1="0.75" x2={281} y2="0.750025" stroke="#8C8C8C" stroke-width="0.5" />
            //     </svg>
            //     <svg
            //         width={281}
            //         height={1}
            //         viewBox="0 0 281 1"
            //         fill="none"
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="absolute left-[115.25px] top-[407.25px]"
            //         preserveAspectRatio="xMidYMid meet"
            //     >
            //         <line x1="2.18557e-8" y1="0.75" x2={281} y2="0.750025" stroke="#8C8C8C" stroke-width="0.5" />
            //     </svg>
            // </div>
    )
}

export default UserEdit;