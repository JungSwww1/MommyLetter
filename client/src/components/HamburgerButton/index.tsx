import React from 'react';
import {HamburgerLayout,List,Item,Button} from "./styles"
import {useNavigate,Link} from "react-router-dom";
import Hamburger from "@/assets/icons/Hamburger";

const HamburgerButton = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login', {replace:true})
    }

const goPage = (param:string) =>{
        navigate(`/${param}`);
}
    return (
        <HamburgerLayout className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"><Hamburger/></div>
            <List tabIndex={0}>
                {/*Consult에 있는 Card리팩토링 후 재사용하여 넣을 예정*/}
                <h1>프로필 카드가 들어갈 곳</h1>
                <Item><Link to="/search">검색</Link></Item>
                <Item><Link to="/consult">상담하기</Link></Item>
                <Item><Link to="/history">상담기록</Link></Item>
                <Item><a>회원정보수정</a></Item>
                <Item><Link to="/consultRegist">상담정보 등록/수정</Link></Item>
                <Button onClick={logout}>로그아웃</Button>
            </List>
        </HamburgerLayout>
    );
};

export default HamburgerButton;


