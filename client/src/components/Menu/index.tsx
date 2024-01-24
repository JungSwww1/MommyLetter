import React,{FC} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {HeaderItem, HeaderLayout, WriteLayout,WriteItem, NavigationItem, NavigationLayout} from "./styles"
import logo_white from "@/assets/images/logo_white.png"
import HamburgerButton from "@/components/HamburgerButton/index"
import {ReactComponent as Feed} from "@/assets/icons/feed.svg"
import {ReactComponent as Diary} from "@/assets/icons/diary.svg"
import {ReactComponent as Plus} from "@/assets/icons/plus.svg"
import {ReactComponent as Search} from "@/assets/icons/search.svg"
import {ReactComponent as Profile} from "@/assets/icons/profile.svg"
import {ReactComponent as X} from "@/assets/icons/x.svg"
// Main화면 가장 상단 영역




// 평상시에 보여줄 화면
export const Header = () => {
    return (<HeaderLayout>
        <HeaderItem style={{boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.15)"}}>
            <div className="flex items-center h-[100%] w-[80%]">
                <Link className="flex items-center h-[100%] mr-3" to={"/"}><img className="ml-5 h-[50%] "
                                                                                src={logo_white}/></Link>
                <Link to={""}><p className="font-bold text-white text-[20px]">Mommy Letter</p></Link>

            </div>
            <HamburgerButton/>
        </HeaderItem>
    </HeaderLayout>);
}



// 작성할 때 보이는 화면
interface WriteProps {
    title: string;
}




export const Write: FC<WriteProps> = ({ title }) => {
    const navigate = useNavigate();
    const handleGoBack = () =>{
        navigate(-1);
    }

    const handleWrite = () =>{
        {/* 작성 API */}
        {/* title 고려해서 API에 넣어야됨 */}



        navigate(-1);
    }
    return (
        <WriteLayout>
            <WriteItem style={{boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.15)"}}>
                <div className="flex justify-between p-3 items-center h-[100%] w-[100%] bg-white">
                    <button onClick={handleGoBack}><X/></button>
                    <span className="font-bold">{title}</span>
                    <button onClick={handleWrite} className="font-bold">완료</button>
                </div>
            </WriteItem>
        </WriteLayout>
    );
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

