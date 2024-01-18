import logo from '@/assets/logo512.png'

const UserProfile = () => {
    return (
        <div className="w-[850px] h-[762px] relative rounded-sm bg-white border border-white/10 min-h-[320px] overflow-x-hidden">
            {/* 배경 사진 */}
            <img
                src={logo}
                alt="Logo"
                className="w-[850px] h-[280px] absolute left-[-1px] top-[-1px] rounded-bl-[15px] rounded-br-[15px] bg-[#ffd1d1]"
            />

            {/* 네비게이션 */}
            <div>
                <div className="w-[51px] h-10 absolute left-[21px] top-[58px] bg-[#ffa0a0]"/>
                <p className="absolute left-[26px] top-[69px] text-[15px] font-bold text-left text-white">LOGO</p>
                <svg
                    width={31}
                    height={3}
                    viewBox="0 0 31 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[800px] top-[71px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line y1="1.5" x2={31} y2="1.5" stroke="black" stroke-width={3}/>
                </svg>
                <svg
                    width={31}
                    height={3}
                    viewBox="0 0 31 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[800px] top-20"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line y1="1.5" x2={31} y2="1.5" stroke="black" stroke-width={3}/>
                </svg>
                <svg
                    width={31}
                    height={3}
                    viewBox="0 0 31 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[800px] top-[90px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line y1="1.5" x2={31} y2="1.5" stroke="black" stroke-width={3}/>
                </svg>
                {/* 다른 선들도 유사한 방식으로 추가 */}
            </div>

            {/* 사용자 프로필 부분 */}
            <img
                src={logo}
                alt="Logo"
                className="w-[200px] h-[200px] absolute left-[325px] top-[150px] rounded-full bg-amber-50"
            />
            <div className="relative left-[25%] top-[-25px]">
                <p className="absolute left-[186px] top-[383px] text-xl font-bold text-left text-black">고승민</p>
                <p className="absolute left-20 top-[477px] text-[15px] font-bold text-left text-black">게시물</p>
                <p className="absolute left-[92px] top-[451px] text-[15px] font-bold text-left text-black">51</p>
                <p className="absolute left-[201px] top-[451px] text-[15px] font-bold text-left text-black">
                    237
                </p>
                <p className="absolute left-[314px] top-[451px] text-[15px] font-bold text-left text-black">
                    216
                </p>
                <p className="absolute left-[193px] top-[477px] text-[15px] font-bold text-left text-black">
                    팔로워
                </p>
                <p className="absolute left-[306px] top-[477px] text-[15px] font-bold text-left text-black">
                    팔로잉
                </p>
                <p className="absolute left-[158px] top-[421px] text-[13px] text-left text-black">
                    고추장 아빠 (15개월)
                </p>
                <div className="w-[188px] h-[27px] absolute left-[21px] top-[522px] rounded-[5px] bg-[#d9d9d9]"/>
                <div className="w-[188px] h-[27px] absolute left-[216px] top-[522px] rounded-[5px] bg-[#d9d9d9]"/>
                <p className="absolute left-[79px] top-[527px] text-[13px] text-left text-black">프로필 편집</p>
                <p className="absolute left-[279px] top-[527px] text-[13px] text-left text-black">프로필 공유</p>
                <div className="w-[121px] h-[121px] absolute left-[21px] top-[597px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[21px] top-[728px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[152px] top-[728px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[152px] top-[597px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[283px] top-[728px] bg-[#ffe0e0]"/>
                <div className="w-[121px] h-[121px] absolute left-[283px] top-[597px] bg-[#ffe0e0]"/>

            </div>

            {/* 프로필 하단 메뉴 */}
            <div className="absolute bottom-0 left-0 w-full">
                <svg
                    width={427}
                    height={66}
                    viewBox="0 0 427 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[850px] h-[58px] absolute top-[750px]"
                    preserveAspectRatio="none"
                >
                    <rect width={428} height={68} fill="#D9D9D9"/>
                    <path
                        d="M31.9 51C30.8275 51 29.9094 50.6192 29.1456 49.8576C28.3819 49.0961 28 48.1806 28 47.1111V33.5H31.9V47.1111H49.45V51H31.9ZM39.7 43.2222C38.6275 43.2222 37.7094 42.8414 36.9456 42.0799C36.1819 41.3183 35.8 40.4028 35.8 39.3333V25.7222H39.7V39.3333H57.25V43.2222H39.7ZM47.5 35.4444C46.4275 35.4444 45.5094 35.0637 44.7456 34.3021C43.9819 33.5405 43.6 32.625 43.6 31.5556V19.8889C43.6 18.8194 43.9819 17.9039 44.7456 17.1424C45.5094 16.3808 46.4275 16 47.5 16H63.1C64.1725 16 65.0906 16.3808 65.8544 17.1424C66.6181 17.9039 67 18.8194 67 19.8889V31.5556C67 32.625 66.6181 33.5405 65.8544 34.3021C65.0906 35.0637 64.1725 35.4444 63.1 35.4444H47.5ZM47.5 31.5556H63.1V23.7778H47.5V31.5556Z"
                        fill="black"
                    />
                    <path
                        d="M120.667 52C119.658 52 118.795 51.6475 118.077 50.9425C117.359 50.2375 117 49.39 117 48.4V23.2C117 22.21 117.359 21.3625 118.077 20.6575C118.795 19.9525 119.658 19.6 120.667 19.6H122.5V16H126.167V19.6H140.833V16H144.5V19.6H146.333C147.342 19.6 148.205 19.9525 148.923 20.6575C149.641 21.3625 150 22.21 150 23.2V48.4C150 49.39 149.641 50.2375 148.923 50.9425C148.205 51.6475 147.342 52 146.333 52H120.667ZM120.667 48.4H146.333V30.4H120.667V48.4ZM120.667 26.8H146.333V23.2H120.667V26.8ZM124.333 37.6V34H142.667V37.6H124.333ZM124.333 44.8V41.2H137.167V44.8H124.333Z"
                        fill="black"
                    />
                    <path
                        d="M211.65 42.75H215.35V35.35H222.75V31.65H215.35V24.25H211.65V31.65H204.25V35.35H211.65V42.75ZM213.5 52C210.941 52 208.536 51.5144 206.285 50.5431C204.034 49.5719 202.076 48.2537 200.411 46.5888C198.746 44.9237 197.428 42.9658 196.457 40.715C195.486 38.4642 195 36.0592 195 33.5C195 30.9408 195.486 28.5358 196.457 26.285C197.428 24.0342 198.746 22.0763 200.411 20.4113C202.076 18.7463 204.034 17.4281 206.285 16.4569C208.536 15.4856 210.941 15 213.5 15C216.059 15 218.464 15.4856 220.715 16.4569C222.966 17.4281 224.924 18.7463 226.589 20.4113C228.254 22.0763 229.572 24.0342 230.543 26.285C231.514 28.5358 232 30.9408 232 33.5C232 36.0592 231.514 38.4642 230.543 40.715C229.572 42.9658 228.254 44.9237 226.589 46.5888C224.924 48.2537 222.966 49.5719 220.715 50.5431C218.464 51.5144 216.059 52 213.5 52ZM213.5 48.3C217.632 48.3 221.131 46.8663 223.999 43.9988C226.866 41.1313 228.3 37.6317 228.3 33.5C228.3 29.3683 226.866 25.8688 223.999 23.0013C221.131 20.1337 217.632 18.7 213.5 18.7C209.368 18.7 205.869 20.1337 203.001 23.0013C200.134 25.8688 198.7 29.3683 198.7 33.5C198.7 37.6317 200.134 41.1313 203.001 43.9988C205.869 46.8663 209.368 48.3 213.5 48.3Z"
                        fill="black"
                    />
                    <path
                        d="M313.733 51L306.033 43.3C304.867 44.2333 303.525 44.9722 302.008 45.5167C300.492 46.0611 298.878 46.3333 297.167 46.3333C292.928 46.3333 289.34 44.8653 286.404 41.9292C283.468 38.9931 282 35.4056 282 31.1667C282 26.9278 283.468 23.3403 286.404 20.4042C289.34 17.4681 292.928 16 297.167 16C301.406 16 304.993 17.4681 307.929 20.4042C310.865 23.3403 312.333 26.9278 312.333 31.1667C312.333 32.8778 312.061 34.4917 311.517 36.0083C310.972 37.525 310.233 38.8667 309.3 40.0333L317 47.7333L313.733 51ZM297.167 41.6667C300.083 41.6667 302.562 40.6458 304.604 38.6042C306.646 36.5625 307.667 34.0833 307.667 31.1667C307.667 28.25 306.646 25.7708 304.604 23.7292C302.562 21.6875 300.083 20.6667 297.167 20.6667C294.25 20.6667 291.771 21.6875 289.729 23.7292C287.688 25.7708 286.667 28.25 286.667 31.1667C286.667 34.0833 287.688 36.5625 289.729 38.6042C291.771 40.6458 294.25 41.6667 297.167 41.6667Z"
                        fill="black"
                    />
                    <path
                        d="M386 52V48.5714H397.667V46.8571H391V33.1429H397.667V31.4286C397.667 28.1143 396.528 25.2857 394.25 22.9429C391.972 20.6 389.222 19.4286 386 19.4286C382.778 19.4286 380.028 20.6 377.75 22.9429C375.472 25.2857 374.333 28.1143 374.333 31.4286V33.1429H381V46.8571H374.333C373.417 46.8571 372.632 46.5214 371.979 45.85C371.326 45.1786 371 44.3714 371 43.4286V31.4286C371 29.3143 371.396 27.3214 372.188 25.45C372.979 23.5786 374.056 21.9429 375.417 20.5429C376.778 19.1429 378.368 18.0357 380.188 17.2214C382.007 16.4071 383.944 16 386 16C388.056 16 389.993 16.4071 391.812 17.2214C393.632 18.0357 395.222 19.1429 396.583 20.5429C397.944 21.9429 399.021 23.5786 399.812 25.45C400.604 27.3214 401 29.3143 401 31.4286V48.5714C401 49.5143 400.674 50.3214 400.021 50.9929C399.368 51.6643 398.583 52 397.667 52H386ZM374.333 43.4286H377.667V36.5714H374.333V43.4286ZM394.333 43.4286H397.667V36.5714H394.333V43.4286Z"
                        fill="black"
                    />
                </svg>
            </div>
        </div>
    );
};

export default UserProfile;
