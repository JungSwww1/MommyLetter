import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import DiaryMomPage from "@/pages/Diary/DiaryMom/page";
import DiaryBabyPage from "@/pages/Diary/DiaryBaby/page";
import {DiaryReadResponseProps} from "@/pages/type/types";
import {fetchDiary} from "@/apis/diary/DiaryAPI";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import DiaryAnalysisPage from "@/pages/Diary/DiaryAnalysis/page";

interface AccessUser {
    nickname: string;
    userId: string;
    role: string;
}

const DiaryPage = () => {
    const {param} = useParams();

    const currParam = param || "mom"; // 기본값 설정
    const [isToggled, setToggled] = useState(currParam === "baby");
    const navigate = useNavigate();
    const [accessUser, setAccessUser] = useState<AccessUser>()
    const [userId, setUserId] = useState<number>()
    const [diaryList, setDiaryList] = useState<DiaryReadResponseProps[]>([]);
    const paramUserId = useParams()["userId"];
    const [isAnalysis, setIsAnalysis] = useState(false)
    useEffect(() => {
        setUserId(Number(paramUserId));

    }, [paramUserId]);

    //접근관련
    useEffect(() => {
        const headerUser = MommyLetterWS.getInstance().getUserInfo()
        setAccessUser(headerUser);
        if (!accessUser) return;
        if (Number(accessUser.userId) !== Number(userId) && accessUser.role !== "Doctor") navigate("/notaccess");
        console.log(userId);
    }, [userId]);


    useEffect(() => {
        if (currParam === "baby") setToggled(true);
    }, [currParam]);

    useEffect(() => {
        refreshDiary();
    }, [userId]);

    const refreshDiary = () => {
        if (!userId) return;
        fetchDiary(Number(userId))
            .then((data) => {
                setDiaryList(data);
            });
    };

    const handleToggle = () => {
        const newToggledState = !isToggled;
        setToggled(newToggledState);
        newToggledState ? navigate("baby") : navigate("mom");

    };
    const goAnalysis = ()=>{
        setIsAnalysis(true);
        navigate(`/${userId}/diary/analysis`);
    }
    const goDiary = () =>{
        setIsAnalysis(false);
        navigate(`/${userId}/diary/mom`);
    }
    return (<div className="h-[100%] w-[100%]">
            <section className="flex justify-between m-3">
                <div>
                    {isAnalysis && <button onClick={goDiary} className="font-bold text-xl hover:scale-110 duration-300">일기</button>}
                    {!isAnalysis && <button onClick={goDiary} className="font-bold text-xl hover:scale-110 duration-300">{isToggled ? "육아일기" : "산모일기"}</button>}
                    / <button onClick={goAnalysis} className="font-bold text-xl hover:scale-110 duration-300">일기분석</button>
                </div>
                {!isAnalysis &&<label className="swap">
                    <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                        <div className="slider"></div>
                    </div>
                </label>}
            </section>
            <Routes>
                <Route path={"/mom"}
                       element={<DiaryMomPage diaryList={diaryList} setDiaryList={setDiaryList} userId={Number(userId)}
                                              refreshDiary={refreshDiary}/>}/>
                <Route path={"/baby"}
                       element={<DiaryBabyPage diaryList={diaryList} setDiaryList={setDiaryList} userId={Number(userId)}
                                               refreshDiary={refreshDiary}/>}/>
                <Route path={"/analysis"} element={<DiaryAnalysisPage/>}/>

            </Routes>
        </div>);
};

export default DiaryPage;
