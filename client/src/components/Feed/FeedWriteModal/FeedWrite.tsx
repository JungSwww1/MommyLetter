import React, {useEffect, useRef, useState} from "react";
import {Label} from './styles';
import BottomUpModal from "@/components/Modal";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Toast} from "@/components/Toast/Toast";
import {ReactComponent as CircleX} from "@/assets/icons/circleX.svg";;
import {writeBoardAPI} from "@/apis/Board/boardApi";


interface UserProps {
    nickname: string;
    userId: string;
}

export const FeedWrite = () => {
    const [content, setContent] = useState("");
    const [imgFiles, setImgFiles] = useState<File[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);
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

    const saveImgFiles = async (e: any) => {
        const files: FileList = e.target.files;
        Array.from(files).forEach(async (file: File) => {
            const err = checkImage(file);
            if (err) {
                console.log(err);
                return;
            }
            await setPreviews(prevFiles => [...prevFiles, URL.createObjectURL(file)]);
            await setImgFiles(imgFiles => [...imgFiles, file]);
        });
    };

    const checkImage = (file: File) => {
        let err = "";
        if (!file) return err = "File does not exist.";
        if (file.size > 1024 * 1024) err = "The largest image size is 1mb.";
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') err = "Image format is incorrect.";
        imgFiles.forEach((imgFile) => {
            if (file === imgFile) err = "File does already exist";
        });
        return err;
    };

    const feedWrite = async () => {
        const formData = new FormData();
        imgFiles.forEach(file => formData.append('uploadFiles', file));
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
            setImgFiles([]);
            setTimeout(() => document.getElementById("closeBtn")?.click(), 800);
        }).catch(error => console.log(error));
        await window.location.reload()
    };

    const fileChange = (index: number) => {
        const tempImages = imgFiles.filter((_, i) => i !== index);
        const tempPreviews = previews.filter((_, i) => i !== index);
        setImgFiles(tempImages);
        setPreviews(tempPreviews);
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

    const writeButton = <button className="btn btn-ghost bg-user hover:bg-MenuColor hover:text-white" onClick={feedWrite}>작성하기</button>
    const children =
        <div className="flex flex-col ml-5 mt-5 w-[98%] h-[100%]">
            <ToastContainer style={{}} position={"top-center"} hideProgressBar={true} autoClose={300}/>

            <div className={"flex flex-row mb-[3%] items-center"}>
                <p>공개범위</p>
                <select value={privacy} onChange={handlePrivacyChange} className={"ml-[2%] shadow-custom-inner border-b-2 rounded-xl p-1"}>
                    <option value="All">전체 공개</option>
                    <option value="Follower">팔로우 공개</option>
                    <option value="Nobody">비공개</option>
                </select>

            </div>
            <div className={"flex flex-row mb-[3%] items-center"}>
                <p>카테고리</p>
                <select value={category} onChange={handleCategoryChange} className={"ml-[2%] shadow-custom-inner border-b-2 rounded-xl p-1"}>
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

            <br/>
            <div>
                <div className="flex justify-between">
                    <Label htmlFor="input-file">업로드</Label><p className="text-gray-400">※ 10MB 이하 png,jpg,jpeg파일</p>
                    <input type="file" id="input-file"
                           className="signup-profileImg-input"
                           onChange={saveImgFiles}
                           ref={imgRef}
                           multiple
                           style={{display: "none"}}/>
                </div>
                <div className="flex">
                    {previews?.map((preview, index) => (<div key={index} className="mr-2">
                        <button className="relative top-1/4 ml-1 hover:bg-gray-400 hover:rounded-lg active:scale-90"
                                onClick={() => {
                                    fileChange(index)
                                }}>
                            <CircleX/>
                        </button>
                        <img src={preview} className="w-[150px] aspect-[1]"/>
                    </div>))}
                </div>

            </div>
        </div>
    return (
        <BottomUpModal children={children} writeButton={writeButton}/>
    );
}

