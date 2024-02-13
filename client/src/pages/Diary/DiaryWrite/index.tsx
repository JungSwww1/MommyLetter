import React, {useEffect, useRef, useState} from "react";
import {Button, Img, Label} from './styles';
import BottomUpModal from "@/components/Modal";
import {createDiary} from "@/apis/diary/DiaryAPI";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Toast} from "@/components/Toast/Toast";
import {ReactComponent as CircleX} from "@/assets/icons/circleX.svg";
import {useParams} from "react-router-dom";
import {DiaryWriteRequestProps} from "@/apis/type/types";

interface DateProps {
    currYear: number;
    currMonth: number;
    currDay: number;
    refreshDiary: () => void;
}

interface UpdateProps {
    currYear: number;
    currMonth: number;
    currDay: number;
    refreshDiary: () => void;
    diary: DiaryWriteRequestProps;
}

interface UserProps {
    nickname: string;
    userId: string;
}

export const DiaryWrite: React.FC<DateProps> = (props) => {
    const [emotion, setEmotion] = useState(99);
    const [content, setContent] = useState("");
    const [imgFiles, setImgFiles] = useState<File[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [user, setUser] = useState<UserProps>({nickname: '', userId: ''}); // UserProps로 수정
    const {currYear, currMonth, currDay, refreshDiary} = props;
    const param = useParams()["*"];


    const emojiArr: string[] = [];
    const path = "/assets/images/"
    const emotionImg = ["1sad.png", "2lonely.png", "3irritated.png", "4tired.png", "5angry.png", "6soso.png", "7delight.png", "8calm.png", "9delight.png", "10excited.png"]
    for (let i = 0; i < 10; i++) {
        emojiArr[i] = path + emotionImg[i];
    }
    useEffect(() => {
        const storedAuth = localStorage.getItem('Auth');
        if (storedAuth) {
            const parsedAuth: UserProps = JSON.parse(storedAuth);
            setUser(parsedAuth);
        }

    }, []);
    const saveImgFiles = async (e: any) => {
        const files: FileList = e.target.files;

        // 여러 파일을 순회하면서 처리
        Array.from(files).forEach(async (file: File) => {
            const err = checkImage(file);
            if (err) {
                console.log(err);
                return; // 에러 발생시 해당 파일은 건너뜀
            }

            // 파일이 유효하다면 미리보기 설정 및 파일 설정
            await setPreviews(prevFiles => [...prevFiles, URL.createObjectURL(file)]);
            await setImgFiles(imgFiles => [...imgFiles, file]);

        });
    };

    const checkImage = (file: File) => {
        let err = ""
        if (!file) return err = "File does not exist."
        if (file.size > 1024 * 1024) {
            err = "The largest image size is 1mb."
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type != 'image/gif') {
            err = "Image format is incorrect."
        }
        imgFiles.map((imgFile) => {
            if (file === imgFile) {
                err = "File does already exist ";
                return err;
            }
        })
        return err
    }
    // X버튼을 눌렀을때 EventListener
    const closeBtn = document.getElementById('closeBtn');
    closeBtn?.addEventListener('click', function () {
        setContent("");
        setEmotion(99);
        setImgFiles([]);
        setPreviews([]);
    });
    const diaryWrite = async () => {
        const createdDate = new Date(currYear, currMonth - 1, currDay + 1);

        const formData = new FormData();

        imgFiles.forEach((file) => {
            formData.append('uploadFiles', file);

        });
        const category = param ? param?.charAt(0).toUpperCase() + param?.substring(1,) : "Mom";
        const diaryRequest = {
            userId: user.userId,
            content: content,
            category: category,
            createdDate: createdDate.toISOString(),
            emoji: emotion,
            emoticon: {
                emotionList: ["Joy"],
                familyList: ["Harmony"],
                healthList: ["Healthy"],
                peopleList: ["Family"],
                weatherList: ["Clear"],
            }
        }

        formData.append('diaryRequest', new Blob([JSON.stringify(diaryRequest)], {
            type: "application/json"
        }));

        if (content === "") {
            Toast.error("내용을 입력하세요")
            return;
        }
        if (emotion === 99) {
            Toast.error("이모지를 클릭해주세요")
            return;
        }
        createDiary(formData).then((response) => {

            setContent("");
            setEmotion(99);
            setImgFiles([]);
            setPreviews([]);
            setTimeout(() => {
                Toast.success("작성되었습니다.");
                document.getElementById("closeBtn")?.click(); // 모달닫기
                refreshDiary();
            }, 500)
        }).catch((error) => {
            console.log(error);
        });

    }


    const fileChange = (index: number) => {
        var tempImages = [];
        var tempPreviews = [];
        for (let i = 0; i < imgFiles.length; i++) {
            if (i == index) continue;
            tempImages.push(imgFiles[i]);
            tempPreviews.push(previews[i]);
        }
        setImgFiles(tempImages);
        setPreviews(tempPreviews);
    }
    const clickedEmotion = (num: number) => {
        setEmotion(num);
    }
    const writeButton = <button className="btn btn-ghost bg-user" onClick={diaryWrite}>작성하기</button>
    const children = <div className="flex flex-col ml-2 mt-5 w-[98%] h-[100%]">

        <ToastContainer style={{}} position={"top-center"} hideProgressBar={true} autoClose={300}/>


        <p className="text-[15px] font-bold text-black">날짜</p>
        <div className="flex justify-around mb-3">
            <p className="font-bold">{currYear}</p>
            <p className="font-bold">{currMonth}</p>
            <p className="font-bold">{currDay}</p>
        </div>

        <p className="text-[15px] font-bold text-black mt-5"> 어떤 하루였나요? </p>

        <div className="flex justify-around ">
            {emojiArr.slice(0, 5).map((emoji, index) => (
                <Button key={index} className={emotion === index ? "bg-gray-300" : ""}
                        onClick={() => clickedEmotion(index)}>
                    <Img src={`${emoji}`}/>
                </Button>))}
        </div>

        <div className="flex justify-around ">
            {emojiArr.slice(5, 10).map((emoji, index) => (
                <Button key={index} className={emotion === index + 5 ? "bg-gray-300" : ""}
                        onClick={() => clickedEmotion(index + 5)}>
                    <Img src={`${emoji}`}/>
                </Button>))}
        </div>
        <br/>
        <div className="h-[30%]">
            <textarea onChange={e => setContent(e.target.value)} placeholder="내용을 입력"
                      className="text-[17px] h-[100%] w-[97%] ext-[#9d9d9d]" value={content}/>
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

        <BottomUpModal children={children} writeButton={writeButton}/>);
}

