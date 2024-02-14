import React, {FC, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {HeaderItem, HeaderLayout, NavigationItem, NavigationLayout, WriteItem, WriteLayout} from "./styles"
import HamburgerButton from "@/components/HamburgerButton/index"
import {ReactComponent as Feed} from "@/assets/icons/feed.svg"
import Diary from "@/assets/icons/diary"
import {ReactComponent as Plus} from "@/assets/icons/plus.svg"
import {ReactComponent as Profile} from "@/assets/icons/profile.svg"
import {ReactComponent as X} from "@/assets/icons/x.svg"
import Search from "@/assets/icons/search";
import Logo from "@/assets/icons/logo";
import Message from "@/assets/icons/message";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import Hamburger from "@/assets/icons/Hamburger";
import palette from "@/lib/styles/colorPalette";
// Main화면 가장 상단 영역


// 평상시에 보여줄 화면
export const Header = () => {
    const [isDoctor, setIsDoctor] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>()
    const [isBlue, setIsBlue] = useState<boolean>()
    const param = useParams()["*"];
    useEffect(() => {
        setIsDoctor(MommyLetterWS.getInstance().getUserInfo().role==="Doctor");
        setUserId(Number(MommyLetterWS.getInstance().getUserInfo().userId));
    }, [isDoctor]);
    useEffect(() => {
        if(!param) return;
        setIsBlue(param.includes("consult")|| param.includes("history"));

    }, [param]);
    return <HeaderLayout>
        <HeaderItem className={`${isBlue? "bg-doctor" : "bg-user"} p-3`} style={{boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.15)"}}>
            <div className="flex items-center h-[100%] w-[70%]">
                <Link className="flex items-center h-[100%] mr-3 ml-5" to={"/"}><Logo fill={`${isBlue ? "white" : palette.MenuColor}`}/></Link>
                <Link to={""}><p className={`${isBlue ? "text-white" : "text-MenuColor" } font-bold text-[20px]`}>Mommy Letter</p></Link>
            </div>
            <Link className="" to={"/message"}><Message fill={`${isBlue ? "white" : palette.MenuColor}`}/></Link>
            {!isDoctor &&<Link to={`${userId}/diary/mom`}><Diary fill={`${isBlue ? "white" : palette.MenuColor}`}/></Link>}

            <HamburgerButton>
                <Hamburger stroke={`${isBlue ? "white" : palette.MenuColor}`}/>
            </HamburgerButton>
        </HeaderItem>
    </HeaderLayout>;
}


// 작성할 때 보이는 화면
interface WriteProps {
    title: string;
}


export const Write: FC<WriteProps> = ({title}) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    const handleWrite = () => {
        {/* 작성 API */
        }
        {/* title 고려해서 API에 넣어야됨 */
        }


        navigate(-1);
    }
    return (<WriteLayout>
        <WriteItem style={{boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.15)"}}>
            <div className="flex justify-between p-3 items-center h-[100%] w-[100%] bg-white">
                <button onClick={handleGoBack}><X/></button>
                <span className="font-bold">{title}</span>
                <button onClick={handleWrite} className="font-bold">완료</button>
            </div>
        </WriteItem>
    </WriteLayout>);
}


// 하단의 네비게이션
export const Navigation = () => {
    return (<NavigationLayout>
        <NavigationItem style={{boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)"}}>
            <Link to={"/"}><Feed/></Link>
            <Link to={"/diary/mom"}><Diary/></Link>
            <Link to={"/plus"}><Plus/></Link>
            <Link to={"/search"}><Search/></Link>
            <Link to={"/profile"}><Profile/></Link>
        </NavigationItem>
    </NavigationLayout>);
}

