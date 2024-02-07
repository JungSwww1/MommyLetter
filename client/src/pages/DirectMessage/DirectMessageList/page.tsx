import React from 'react';
import DirectMessageCard from "@/components/DirectMessageCard";
import {Link} from 'react-router-dom'
const DirectMessageList = () => {
    return (
        <div className="flex flex-col justify-center items-center w-[100%]">
            <Link className="w-[100%] hover:bg-gray-100" to="room">
                <DirectMessageCard profileUrl="/assets/images/seungwon.png"nickname="Steven" content="반가워요 ㅎㅎ" date={"1706578000000"} roomNumber={123}/>
            </Link>
            <Link className="w-[100%] hover:bg-gray-100" to="room">
                <DirectMessageCard profileUrl="/assets/images/seungwon.png"nickname="Steven2" content="반가워요 ㅎㅎ" date={"1705578000000"} roomNumber={222}/>
            </Link>
            <Link className="w-[100%] hover:bg-gray-100" to="room">
                <DirectMessageCard profileUrl="/assets/images/seungwon.png"nickname="Steven3" content="반가워요 ㅎㅎ" date={"1702578000000"} roomNumber={222}/>
            </Link>
            <Link className="w-[100%] hover:bg-gray-100" to="room">
                <DirectMessageCard profileUrl="/assets/images/seungwon.png"nickname="Steven4" content="반가워요 ㅎㅎ" date={"1605578000000"} roomNumber={222}/>
            </Link>
            <Link className="w-[100%] hover:bg-gray-100" to="room">
                <DirectMessageCard profileUrl="/assets/images/seungwon.png"nickname="Steven5" content="반가워요 ㅎㅎ" date={"1205578000000"} roomNumber={222}/>
            </Link>
        </div>
    );
};

export default DirectMessageList;