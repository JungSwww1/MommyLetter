import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import DiaryMomPage from "@/pages/Diary/DiaryMom/page";
import DiaryBabyPage from "@/pages/Diary/DiaryBaby/page";


const DiaryPage = () => {
    const currParam = useParams()["*"];
    const [isToggled, setToggled] = useState(false);
    useEffect(() => {
        if(currParam=="baby") setToggled(true);
    }, []);
    const navigate = useNavigate()
    const handleToggle = () => {
        setToggled(!isToggled);
        isToggled ? navigate("mom") : navigate("baby")
    };

    return (<div className="h-[100%] w-[100%]">
        <section className="flex justify-between m-3">
            <span className="font-bold text-xl">{isToggled ? "육아일기" : "산모일기"}</span>
            {/* On Off 버튼 */}
            <label className="swap">
                <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                    <div className="slider"></div>
                </div>
            </label>
        </section>
        <Routes>
            <Route path={"/mom"} element={<DiaryMomPage/>}/>
            <Route path={"/baby"} element={<DiaryBabyPage/>}/>
        </Routes>
    </div>)
};

export default DiaryPage;