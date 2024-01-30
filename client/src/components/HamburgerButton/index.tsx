import React from 'react';
import {HamburgerLayout,List,Item,Button} from "./styles"
import {useNavigate} from "react-router-dom";
import Hamburger from "@/assets/icons/Hamburger";
import {Link} from 'react-router-dom'

const HamburgerButton = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginInfo');
        navigate('/login')
    }

    return (
        <HamburgerLayout className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"><Hamburger/></div>
            <List tabIndex={0}>
                {/*Consult에 있는 Card리팩토링 후 재사용하여 넣을 예정*/}
                <h1>프로필 카드가 들어갈 곳</h1>
                <Link to="/search"><Item><a>검색</a></Item></Link>
                <Link to="/consult"><Item><a>상담하기</a></Item></Link>
                <Link to="/history"><Item><a>상담기록</a></Item></Link>
                <Item><a>회원정보수정</a></Item>
                <Item><a>상담정보 등록/수정</a></Item>
                <Button onClick={logout}>로그아웃 들어가자</Button>
            </List>
        </HamburgerLayout>
    );
};

export default HamburgerButton;


