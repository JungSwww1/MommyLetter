import React, {ReactNode, useEffect, useState} from 'react';
import {Button, HamburgerLayout, Item} from "./styles"
import {Link, useNavigate, useParams} from "react-router-dom";
import Search from "@/assets/icons/search";
import {ReactComponent as Edit} from "@/assets/icons/edit.svg";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {ReactComponent as Power} from "@/assets/icons/power.svg";
import {ReactComponent as Profile} from "@/assets/icons/profile.svg";
import {ReactComponent as Consult} from "@/assets/icons/users.svg";
import {ReactComponent as Book} from "@/assets/icons/book.svg";
import {ReactComponent as Chart} from "@/assets/icons/bar-chart-2.svg";
import Diary from "@/assets/icons/diary"


const HamburgerButton = ({children}: { children: ReactNode }) => {
    const [nickname, setNickname] = useState("")
    const [isDoctor, setIsDoctor] = useState<boolean>();

    const user = MommyLetterWS.getInstance().getUserInfo()
    const param = useParams()["*"];
    const [isBlue, setIsBlue] = useState<boolean>()
    useEffect(() => {
        if (!user || !user.nickname || !user.userId) return;

            setNickname(user.nickname);
            setIsDoctor(user.role === "Doctor");

    }, [user]);
    useEffect(() => {
        if(!param) return;
        setIsBlue(param.includes("consult")|| param.includes("history"));

    }, [param]);
    const navigate = useNavigate();
    const logout = async () => {
        await localStorage.clear();
        await navigate('/login', {replace: true})
        await window.location.reload()
    }

    const goPage = (param: string) => {
        navigate(`/${param}`);
    }
    return (<HamburgerLayout className="">
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button font-bold ">{children}</label>
                </div>
                <div className="h-[100%] drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu w-[30%] min-h-full bg-base-200 text-base-content">
                        <div
                            className={`${isBlue ?  "text-white bg-doctor" : "text-pointColor bg-user"} flex flex-row items-center relative font-bold h-[100%] bottom-1 h-[10%]  w-[100%]  rounded-xl shadow-xl`}>
                            <img className="w-[20%] mr-3" src="/assets/images/default_image.png"/>{nickname}</div>
                        <div className="h-[80%]">
                            <Item><Link to="/profile"><Profile/>내 정보</Link></Item>
                            {!isDoctor && <Item><Link to={`/${user.userId}/diary/mom`}><Diary fill={"black"}/>나의일기</Link></Item>}
                            {!isDoctor && <Item><Link to={`/${user.userId}/diary/analysis`}><Chart/>일기분석</Link></Item>}
                            {!isDoctor && <Item><Link to="/consult"><Consult/>상담하기</Link></Item>}
                            {!isDoctor && <Item><Link to="/history"><Book/>상담기록</Link></Item>}
                            {!isDoctor &&<Item><Link to="/consultRegist"><Edit/>상담정보 등록/수정</Link></Item>}
                            {isDoctor && <Item><Link to="/reserve"><Consult/>대기환자</Link></Item>}
                            <Item><Link to="/search/nickname"><Search fill={"black"}/>검색</Link></Item>

                        </div>
                        <div
                            className={`${isBlue ?  "text-white bg-doctor" : "text-pointColor bg-user"} flex active:scale-x-95 duration-300 bg-user justify-center items-center fixed bottom-0 w-[100%] rounded-xl`}>
                            <Button
                                className={`${isBlue ?  "text-white bg-doctor" : "text-pointColor bg-user"} font-bold hover:text-black rounded-xl h-[20%] w-[100%]`}
                                onClick={logout}><Power/>로그아웃</Button>
                        </div>
                    </ul>
                </div>
            </div>

        </HamburgerLayout>);
};

export default HamburgerButton;


