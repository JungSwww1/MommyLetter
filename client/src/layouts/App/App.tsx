import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";
import Main from "@/layouts/Main";

function App() {
    const isAuth = () => {
        return localStorage.getItem('Auth') !== null;
    };

    return (
        <div className="w-[40%] h-[100%] bg-white">
            <Routes>
                {/* /login 경로로 이동할지 결정하는 조건부 라우팅 */}
                {!isAuth() && (
                    <Route path={"/login"} element={<LoginPage/>}/>
                )}
                {/* 인증된 사용자라면 Main 페이지로 이동 */}
                {isAuth() && (
                    <Route path={"/*"} element={<Main/>}/>
                )}
                {/* 인증되지 않은 사용자를 /login 페이지로 리디렉션 */}
                <Route path={"*"} element={<Navigate to="/login"/>}/>
            </Routes>
        </div>);
}
export default App;
