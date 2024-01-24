import React from "react";
import {Link} from 'react-router-dom';
import {HeaderItem, HeaderLayout, NavigationItem, NavigationLayout} from "./styles"
import logo from "@/assets/images/logo_white.png"
import HamburgerButton from "@/components/HamburgerButton/index"
import {ReactComponent as Feed} from "@/assets/icons/feed.svg"
import {ReactComponent as Diary} from "@/assets/icons/diary.svg"
import {ReactComponent as Plus} from "@/assets/icons/plus.svg"
import {ReactComponent as Search} from "@/assets/icons/search.svg"
import {ReactComponent as Profile} from "@/assets/icons/profile.svg"

export const Index = () => {
    return (<HeaderLayout>
        <HeaderItem style={{boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.15)"}}>
            <div className="flex items-center h-[100%] w-[80%]">
                <Link className="flex items-center h-[100%] mr-3" to={"/"}><img className="ml-5 h-[50%] "
                                                                                src={logo}/></Link>
                <Link to={""}><p className="font-bold text-white text-[20px]">Mommy Letter</p></Link>
            </div>
            <HamburgerButton/>
        </HeaderItem>
    </HeaderLayout>);
}

export const Navigation = () => {
    return (<NavigationLayout>
            <NavigationItem style={{boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)"}}>
                <Link to={"/"}><Feed/></Link>
                <Link to={"/diary"}><Diary/></Link>
                <Link to={"/plus"}><Plus/></Link>
                <Link to={"/search"}><Search/></Link>
                <Link to={"/profile"}><Profile/></Link>
            </NavigationItem>
        </NavigationLayout>);
}

