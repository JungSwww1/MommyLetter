import React from "react";
import {HeaderItem, HeaderLayout, NavigationItem, NavigationLayout} from "./styles"
import logo from "@/assets/images/logo_white.png"
import title from "@/assets/images/title.png"
import HamburgerButton from "@/components/HamburgerButton/index"
import {ReactComponent as FeedImg} from "@/assets/icons/feed.svg"
import {ReactComponent as DiaryImg} from "@/assets/icons/diary.svg"
import {ReactComponent as PlusImg} from "@/assets/icons/plus.svg"
import {ReactComponent as SearchImg} from "@/assets/icons/search.svg"
import {ReactComponent as ProfileImg} from "@/assets/icons/profile.svg"


export const Header = () => {
    return (<HeaderLayout>
        <HeaderItem style={{boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.15)"}}>
            <div className="flex items-center h-[100%] w-[80%]">
                <img className=" ml-5 h-[50%] " src={logo}/>
                <img className="mt-5 h-[40%]" src={title}/>
            </div>
            <HamburgerButton/>
        </HeaderItem>
    </HeaderLayout>);
}

export const Navigation = () => {
    return (<NavigationLayout>
        <NavigationItem style={{ boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)" }}>
            <FeedImg/>
            <DiaryImg/>
            <PlusImg/>
            <SearchImg/>
            <ProfileImg/>
        </NavigationItem>
    </NavigationLayout>);
}

