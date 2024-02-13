import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import DiaryMomPage from "@/pages/Diary/DiaryMom/page";
import DiaryBabyPage from "@/pages/Diary/DiaryBaby/page";
import {DiaryReadResponseProps} from "@/pages/type/types";
import {fetchDiary} from "@/apis/diary/DiaryAPI";

interface UserProps {
    nickname: string;
    userId: string;
}

const DiaryPage = () => {
    const currParam = useParams()["*"];
    const [isToggled, setToggled] = useState(false);

    const [user, setUser] = useState<UserProps>({nickname: '', userId: ''});
    const navigate = useNavigate()
    const handleToggle = () => {
        setToggled(!isToggled);
        isToggled ? navigate("mom") : navigate("baby")
    };
    const [diaryList, setDiaryList] = useState<DiaryReadResponseProps[]>([]);


    useEffect(() => {
        if (currParam == "baby") setToggled(true);
    }, []);
    useEffect(() => {
        const storedAuth = localStorage.getItem('Auth');
        if (storedAuth) {
            const parsedAuth: UserProps = JSON.parse(storedAuth);
            setUser(parsedAuth);
        }
    }, []);

    const refreshDiary = () => {
        fetchDiary(Number(user.userId))
            .then((data) => {
                setDiaryList(data);
            });
    }
    useEffect(() => {
        refreshDiary();
    }, [user]);

    return (


        <div className="h-[100%] w-[100%]">
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
            <Route path={"/mom"} element={<DiaryMomPage diaryList={diaryList} setDiaryList={setDiaryList} user={user}
                                                        refreshDiary={refreshDiary}/>}/>
            <Route path={"/baby"} element={<DiaryBabyPage diaryList={diaryList} setDiaryList={setDiaryList} user={user}
                                                          refreshDiary={refreshDiary}/>}/>
        </Routes>
    </div>)
};

export default DiaryPage;