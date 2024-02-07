import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";
import Main from "@/layouts/Main";

function App() {
    return (
        <div className="w-[40%] h-[100%] bg-white">
            <Routes>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/*"} element={<Main/>}/>
            </Routes>
        </div>);
}
export default App;
