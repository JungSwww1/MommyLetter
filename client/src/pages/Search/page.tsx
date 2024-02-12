import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {ReactComponent as Search} from '@/assets/icons/search.svg'
import {fetchHashtag, fetchNickname} from "@/apis/search/SearchAPI";
import HashTagComponent from "@/components/Search/HashTag";
import NicknameComponent from "@/components/Search/Nickname";
import {useWebSocket} from "@/hooks/useWebSocket";

interface NicknameProps {

    "userId": number,
    "nickname": string,
    "intro": string,
    "backgroundPhoto": string,
    "profilePhoto": string,
    "follower": number,
    "following": number
}

interface HashtagProps {
    "content": string
}

const SearchPage = () => {
    const currPath = window.location.pathname;
    const [inputData, setInputData] = useState("");
    const [nicknameList, setNicknameList] = useState<NicknameProps[]>()
    const [hashtagList, setHashtagList] = useState<HashtagProps[]>()
    const param = useParams()["*"];


    useEffect(()=>{

    },[])
    const searchData = () => {

        fetchNickname(inputData).then((response) => {
            setNicknameList(response);
        });

        fetchHashtag(inputData).then((response) => {
            setHashtagList(response);
        });
        
        console.log(nicknameList);

    }
    return (<div className="flex flex-col w-[100%] h-[100%]">
        <div
            className="flex flex-row m-5 bg-white shadow-md items-center w-[95%] h-[4%] bg-gray-300 rounded-2xl p-5">
            <input type="text" onChange={e => setInputData(e.target.value)} className="w-[95%] " placeholder="검색어를 입력"/>
            <button onClick={searchData}><Search/></button>
        </div>
        <div className="flex justify-around p-3">
            <Link to={"/search/nickname"} className="hover:text-MenuColor hover:font-bold">닉네임</Link>
            <Link to={"/search/hashtag"} className="hover:text-MenuColor hover:font-bold">태그</Link>
        </div>
        <hr/>
        <div className="flex justify-center mt-3">
            <Routes>
                {nicknameList && <Route path={"/nickname"} element={<NicknameComponent nicknameList={nicknameList}/>}/>}
                {hashtagList && <Route path={"/hashtag"} element={<HashTagComponent hashtagList={hashtagList}/>}/>}
            </Routes>

        </div>
    </div>);
};

export default SearchPage;