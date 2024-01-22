import React from "react";
import {HeaderItem, HeaderLayout, NavigationLayout} from "./styles"
import logo from "@/assets/images/logo_white.png"
import title from "@/assets/images/title.png"
import HamburgerButton from "@/components/HamburgerButton/index"
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
            <div
                className="w-[428px] h-[68px] rounded-tl-[10px] rounded-tr-[10px] bg-white"
                style={{boxShadow: "0px -3px 4px 0 rgba(0,0,0,0.25)"}}
            />

        </NavigationLayout>);
}

