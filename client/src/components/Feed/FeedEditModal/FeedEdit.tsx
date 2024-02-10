import React, {useEffect, useRef, useState} from "react";
import BottomUpModal from "@/components/Feed/FeedEditModal/index";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Toast} from "@/components/Toast/Toast";
import {writeBoardAPI} from "@/apis/Board/boardApi";
import {BoardProps} from "@/pages/type/types";


interface UserProps {
    nickname: string;
    userId: string;
}
interface FeedEditProps {
    boardId: number;
    boardContent: string;
    boardAccess: string;
    boardCategory: string;
    boardHashTagList: { content: string }[];
}
export const FeedEdit: React.FC<FeedEditProps> = ({boardId, boardContent, boardAccess, boardCategory, boardHashTagList}) => {
    console.log(boardId, boardContent, boardAccess, boardCategory, boardHashTagList)
    const [content, setContent] = useState("");
    const [user, setUser] = useState<UserProps>({ nickname: '', userId: '' });
    const [hashtagInput, setHashtagInput] = useState(""); // 해시태그 입력 상태 추가
    const [hashtags, setHashtags] = useState<{ content: string; }[]>([]);

    useEffect(() => {
        const storedAuth = localStorage.getItem('Auth');
        if (storedAuth) {
            const parsedAuth: UserProps = JSON.parse(storedAuth);
            setUser(parsedAuth);
        }
    }, []);

    const feedEdit = async () => {
        const formData = new FormData();
        const hashtagList = hashtags.map(tag => tag.content);

        const boardRequest = {
            userId: user.userId,
            content: content,
            access: privacy,
            category:category,
            hashtagList : hashtagList,
        };
        formData.append('boardRequest', new Blob([JSON.stringify(boardRequest)], { type: "application/json" }));
        writeBoardAPI(formData).then(response => {
            if (content === "") {
                Toast.error("내용을 입력하세요");
                return;
            }
            Toast.success("작성되었습니다.");
            setContent("");
            setTimeout(() => document.getElementById("closeBtn")?.click(), 800);
        }).catch(error => console.log(error));
        await window.location.reload()
    };

    // 해시태그 추가
    const addHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && hashtagInput.trim() !== "") {
            setHashtags(prev => [...prev, { content: hashtagInput.trim() }]);
            setHashtagInput(""); // 입력 필드 초기화
            e.preventDefault();
        }
    };

    // 해시태그 삭제
    const removeHashtag = (index: number) => {
        setHashtags(prev => prev.filter((_, i) => i !== index));
    };
    const [privacy, setPrivacy] = useState("All");
    const [category, setCategory] = useState("One");

    // 공개 범위와 카테고리 선택 핸들러
    const handlePrivacyChange = (e:any) => {
        setPrivacy(e.target.value);
    };

    const handleCategoryChange = (e:any) => {
        setCategory(e.target.value);
    };

    const writeButton = <button className="btn btn-ghost bg-user hover:bg-MenuColor hover:text-white" onClick={feedEdit}>수정하기</button>
    const children =
        <div className="flex flex-col ml-5 mt-5 w-[98%] h-[100%]">
            <ToastContainer style={{}} position={"top-center"} hideProgressBar={true} autoClose={300}/>

            <div className={"flex flex-row mb-[3%] items-center"}>
                <p>공개범위</p>
                <select value={privacy} onChange={handlePrivacyChange}
                        className={"ml-[2%] shadow-custom-inner border-b-2 rounded-xl p-1"}>
                    <option value="All">전체 공개</option>
                    <option value="Follower">팔로우 공개</option>
                    <option value="Nobody">비공개</option>
                </select>

            </div>
            <div className={"flex flex-row mb-[3%] items-center"}>
                <p>카테고리</p>
                <select value={category} onChange={handleCategoryChange}
                        className={"ml-[2%] shadow-custom-inner border-b-2 rounded-xl p-1"}>
                    <option value="One">산모</option>
                    <option value="Two">육아</option>
                    <option value="Three">산모/육아 팁</option>
                </select>
            </div>
            <div className="h-[30%]">
                <textarea onChange={e => setContent(e.target.value)} placeholder="내용을 입력해주세요."
                          className="shadow-custom-inner border-b-2 text-[17px] h-[100%] w-[97%] ext-[#9d9d9d] rounded-xl p-2"/>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="해쉬태그를 입력해주세요. 엔터키를 눌러 추가하세요."
                    value={hashtagInput} // 입력 상태 바인딩
                    onChange={e => setHashtagInput(e.target.value)} // 입력 상태 업데이트
                    onKeyDown={addHashtag}
                    className="mt-[5%] text-[100%] w-[97%] shadow-custom-inner border-b-2 rounded-xl p-2"
                />
                <div className="flex flex-wrap">
                    {hashtags.map((tag, index) => (
                        <div key={index} className="m-1 bg-gray-200 rounded-full px-2 py-1">
                            {tag.content}
                            <button onClick={() => removeHashtag(index)}>x</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    return (
        <BottomUpModal children={children} writeButton={writeButton}/>
    );
}

