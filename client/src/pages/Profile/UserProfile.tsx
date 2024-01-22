import logo from '@/assets/images/sample1.jpg'
import {Link} from 'react-router-dom'
import {BackgroundImg, BottomNav, Profile, ProfileButton, ProfileImg, Text} from "@/pages/Profile/styles";
const UserProfile = () => {
    return (
        <div className="relative">
            {/* 배경 사진 */}
            <BackgroundImg
                src={logo}
                alt="Logo"
            />
            {/* 네비게이션 바로 아래 fixed 된건 절대 건드리지 말것*/}
            {/*nav bar에 있는 것들은 나중에 수정할 것이므로 style등은 안 건드림*/}
            <nav className="fixed top-0">
                <div className="w-[51px] h-10 absolute left-[21px] top-[58px] bg-[#ffa0a0]"/>
                <p className="absolute left-[26px] top-[69px] text-[15px] font-bold text-left text-white">LOGO</p>
                <svg
                    width={31}
                    height={3}
                    viewBox="0 0 31 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[790px] top-[71px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line y1="1.5" x2={31} y2="1.5" stroke="black" strokeWidth={3}/>
                </svg>
                <svg
                    width={31}
                    height={3}
                    viewBox="0 0 31 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[790px] top-20"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line y1="1.5" x2={31} y2="1.5" stroke="black" strokeWidth={3}/>
                </svg>
                <svg
                    width={31}
                    height={3}
                    viewBox="0 0 31 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[790px] top-[90px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line y1="1.5" x2={31} y2="1.5" stroke="black" strokeWidth={3}/>
                </svg>
            </nav>

            {/* 사용자 프로필 부분 */}
            <Profile>
                <ProfileImg
                    src={logo}
                    alt="Logo"
                />
                <Text className="left-[186px] top-[383px]">고승민</Text>
                <Text className="left-20 top-[477px] ">게시물</Text>
                <Text className="left-[92px] top-[451px] ">51</Text>
                <Text className="left-[201px] top-[451px]">237</Text>
                <Text className="left-[314px] top-[451px]">216</Text>
                <Text className="left-[193px] top-[477px]">팔로워</Text>
                <Text className="left-[306px] top-[477px] ">팔로잉</Text>
                <Text className="left-[158px] top-[421px] text-[13px]">
                    고추장 아빠 (15개월)
                </Text>
                <ProfileButton className="left-[21px] top-[522px]">프로필 편집</ProfileButton>
                <ProfileButton className="left-[216px] top-[522px]">프로필 공유</ProfileButton>

                {/*하단은 예시 게시물*/}
                <div className="w-[121px] h-[121px] absolute left-[21px] top-[597px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[152px] top-[597px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[283px] top-[597px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[152px] top-[728px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[283px] top-[728px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[21px] top-[728px] bg-[#ffe0e0]"/>

            </Profile>

            {/* 프로필 하단 메뉴 */}
            <BottomNav>
                <div className="flex justify-between">
                    <Link to="/first" className="nav-link">
                        s
                    </Link>
                    <Link to="/second" className="nav-link">
                        sdsdsd
                    </Link>
                    <Link to="/third" className="nav-link">
                        ddddd
                    </Link>
                    <Link to="/fourth" className="nav-link">
                        sssss
                    </Link>
                    <Link to="/fifth" className="nav-link">
                        www
                    </Link>
                </div>
            </BottomNav>
        </div>
);
};

export default UserProfile;
