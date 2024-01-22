import logo from '@/assets/sample1.jpg'
import {ProfileImg} from "@/pages/UserEdit/styles";
import {Link} from "react-router-dom"

const UserEdit = () => {
    return (
        <div className="">
            <nav className="bg-gray-300 mt-[5%] mb-[5%]">This is header</nav>
            <div className="bg-amber-200 mt-[10%]">
                {/* 하단의 헤더 마진값은 추후에 조정해야 한다. */}
                

                {/* Profile IMG */}
                <div className="flex justify-center">
                    <ProfileImg
                        src={logo}
                        alt="Logo"
                    />
                </div>
                
                {/* Line under profile img */}
                <svg
                    viewBox="0 0 385 1"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    className='mb-[5%]'
                    >
                    <line x1="-4.37114e-8" y1="0.500031" x2={385} y2="0.499997" stroke="black" />
                </svg>
                
                {/* nickname and intro */}
                <div className="flex mb-[2%] justify-around">
                    <div>닉네임</div>
                    <input type="text" className="w-[59%] ml-[35px] border-b-2 border-black"/>
                </div>
                <div className="flex mb-[2%] justify-around">
                    <div>소개</div>
                    <input type="text" className="w-[59%] ml-[50px]"/>
                </div>

                {/* password change and user withdrawal */}
                <div className="mt-[10%]">
                    <div className="ml-[7%] mb-[2%]">
                        <Link to = "/passwordChange">비밀번호 변경</Link>
                    </div>
                    <div className="ml-[7%] mb-[2%]">
                        <Link to ="/withdrawal">회원탈퇴</Link>
                    </div>
                </div>
            </div> 

        </div>
    )
}

export default UserEdit;