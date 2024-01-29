import React from 'react';
import {Link,Routes,Route} from 'react-router-dom'
import {ReactComponent as Search} from '@/assets/icons/search.svg'
import DirectMessageCard from "@/components/DirectMessageCard";

const SearchPage = () => {
    return (<div className="flex flex-col w-[100%] h-[100%]">
            <div
                className="flex flex-row m-5 bg-white shadow-md items-center w-[95%] h-[4%] bg-gray-300 rounded-2xl p-5">
                <input type="text" className="w-[95%] " placeholder="검색어를 입력"/>
                <button><Search/></button>
            </div>
            <div className="flex justify-around p-3">
                <Link to={"/search/nickname"} className="hover:text-MenuColor hover:font-bold">닉네임</Link>
                <Link to={"/search/hashtag"} className="hover:text-MenuColor hover:font-bold">해시태그</Link>
            </div>
            <hr/>
            <div className="flex justify-center mt-3">
                <Routes>
                    <Route path={"/nickname"} element={<DirectMessageCard/>}/>
                    <Route path={"/hashtag"} element={<DirectMessageCard/>}/>
                </Routes>

            </div>
        </div>);
};

export default SearchPage;