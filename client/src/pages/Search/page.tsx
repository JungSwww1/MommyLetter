import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, useNavigate, useParams} from 'react-router-dom'
import {ReactComponent as Search} from '@/assets/icons/search.svg'
import {fetchHashtag, fetchNickname} from "@/apis/search/SearchAPI";
import HashTagComponent from "@/components/Search/HashTag";
import NicknameComponent from "@/components/Search/Nickname";


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
    const [isChecked, setIsChecked] = useState<number>(1)
    const navigate = useNavigate();
    useEffect(() => {
        navigate('nickname');
    }, [])
    const searchData = () => {

        fetchNickname(inputData).then((response) => {
            setNicknameList(response);
        });

        fetchHashtag(inputData).then((response) => {
            setHashtagList(response);
        });

        console.log(nicknameList);

    }
    const changeBg = (state: number) => {
        setIsChecked(state);
    }

    const handleOnKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            searchData();
        }

    }
    return (<div className="flex flex-col w-[100%] h-[100%]">
        <div
            className="flex flex-row m-5 bg-white shadow-md items-center w-[95%] h-[4%] bg-gray-300 rounded-2xl p-5">
            <input type="text" onChange={e => setInputData(e.target.value)} className="w-[95%] " placeholder="검색어를 입력"
                   onKeyUp={handleOnKeyPress}/>
            <button onClick={searchData}><Search/></button>
        </div>
        <div className="flex justify-around p-3">

            <Link to={"/search/nickname"} onClick={() => {
                changeBg(1)
            }}
                  className={`hover:text-MenuColor hover:font-bold ${isChecked == 1 && "font-bold text-MenuColor"}`}>닉네임</Link>

            <Link to={"/search/hashtag"} onClick={() => {
                changeBg(2)
            }}
                  className={`hover:text-MenuColor hover:font-bold ${isChecked == 2 && "font-bold text-MenuColor"}`}>태그</Link>
        </div>
        <hr/>
        <div className="flex h-[100%] justify-center mt-3">
            <Routes>
                {nicknameList && <Route path={"/nickname"} element={<NicknameComponent nicknameList={nicknameList}/>}/>}
                {hashtagList && <Route path={"/hashtag"} element={<HashTagComponent hashtagList={hashtagList}/>}/>}
            </Routes>

        </div>
    </div>);
};

export default SearchPage;