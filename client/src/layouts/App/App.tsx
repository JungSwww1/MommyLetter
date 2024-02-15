import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";
import Main from "@/layouts/Main";
import UserRegist from "@/pages/UserRegist/UserRegist";
import styled from 'styled-components';

const Container = styled.div`
  width: 40%;
  height: 100%;
  background-color: white; 

  /* 모바일 환경에서는 너비를 100%로 */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

function App() {
    const isAuth = () => {
        return localStorage.getItem('Auth') !== null;
    };

    return (
        <Container>
            <Routes>
                {/* /login 경로로 이동할지 결정하는 조건부 라우팅 */}
                <Route path="/login" element={!isAuth() ? <LoginPage/> : <Navigate to="/" replace />} />
                <Route path="/join" element={!isAuth() ? <UserRegist/> : <Navigate to="/" replace />} />
                {/* 인증된 사용자라면 Main 페이지로 이동 */}
                {isAuth() && (
                    <Route path={"/*"} element={<Main/>}/>
                )}
                {/* 인증되지 않은 사용자를 /login 페이지로 리디렉션 */}
                <Route path={"*"} element={<Navigate to="/login"/>}/>
            </Routes>
        </Container>
    );
}

export default App;
