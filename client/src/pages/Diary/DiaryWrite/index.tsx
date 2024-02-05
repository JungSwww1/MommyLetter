import React, {useEffect, useRef, useState} from "react";
import {Img, Label, Button} from './styles';
import BottomUpModal from "@/components/Modal";
import {fileExtensionValid} from "@/pages/Common/FileUpload";
import {createDiary} from "@/apis/diary/DiaryAPI";
import {DiaryWriteRequestProps} from "@/apis/type/types";
import {ReactComponent as CircleX} from "@/assets/icons/circleX.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";
import {Toast} from "@/components/Toast/Toast";

interface DateProps {
    currYear: number;
    currMonth: number;
    currDay: number;
}

export const DiaryWrite = ({currYear, currMonth, currDay}: DateProps) => {
    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState(currYear);
    const [selectedMonth, setSelectedMonth] = useState(currMonth);
    const [selectedDay, setSelectedDay] = useState(currDay);
    const [endDay, setEndDay] = useState<number>(0);
    const [emotion, setEmotion] = useState(99);
    const [content, setContent] = useState("");

    useEffect(() => {
        // 현재 날짜 기준으로 최대 년도를 보여준다.
        const newYears = [];
        const newMonths = [];
        for (let i = 2010; i <= currYear + 1; i++) newYears.push(i);
        for (let i = 1; i <= 12; i++) newMonths.push(i);
        setYears(newYears);
        setMonths(newMonths);
        // 선택된 년도와 월을 확인 후 최대 일을 반환
        const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
        setEndDay(lastDay);
        const newDays = [];
        for (let i = 1; i <= lastDay; i++) newDays.push(i);
        setDays(newDays);



    }, [selectedYear, selectedMonth, currYear]);

    const [imgFiles, setImgFiles] = useState<string[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);

    const saveImgFiles = () => {
        const files = imgRef.current?.files;

        if (files && files.length > 0) {
            const fileArray: File[] = Array.from(files);
            const validFiles = fileArray.filter(fileExtensionValid);

            Promise.all(
                validFiles.map((file) => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                    });
                })
            ).then((results) => {
                setImgFiles([...imgFiles, ...results]);
                console.log(imgFiles)
            });
        }
    };
const diaryWrite = () =>{
    const createdDate = new Date(selectedYear, selectedMonth - 1, selectedDay);

    const writeInfo: DiaryWriteRequestProps = {
        userId: 101,
        content: content,
        category: "Baby",
        createdDate: createdDate.toISOString(),
        emoji: emotion,
        photoList: [
            { path: "/assets/images/seungwon.png" },
            { path: "/assets/images/seungwon.png" },
        ],
        emoticon: {
            emotionList: ["Joy"],
            familyList: ["Harmony"],
            healthList: ["Healthy"],
            peopleList: ["Family"],
            weatherList: ["Clear"],
        },
        emoticonList: ["Joy"]
    };
    createDiary(writeInfo).then((response)=>{
        if(content===""){
            Toast.error("내용을 입력하세요")
            return;
        }
        Toast.success("작성되었습니다.");

        setTimeout(()=>{
            document.getElementById("closeBtn")?.click(); // 모달닫기
        },800)
    }).catch(
        (error)=>{
            console.log(error);
        }
    );

}


const fileChange = (index:number) =>{
    var temp = [];
    for(let i = 0; i<imgFiles.length;i++){
        if(i==index) continue;
        temp.push(imgFiles[i]);

    }
    setImgFiles(temp);
}
const clickedEmotion = (num:number) =>{
    setEmotion(num);
}
    const writeButton = <button className="btn btn-ghost bg-user" onClick={diaryWrite}>작성하기</button>
    const children = <div className="flex flex-col ml-5 mt-5 w-[98%] h-[100%]">

        <ToastContainer style={{}} position={"top-center"} hideProgressBar={true} autoClose={300}/>
        <p className="text-[15px] font-bold text-black">선택 날짜</p>
        <div className="flex justify-around mb-3">
            <p className="font-bold">{currYear}</p>
            <p className="font-bold">{currMonth}</p>
            <p className="font-bold">{currDay}</p>

        </div>
        <p className="text-[15px] font-bold text-black mt-5"> 오늘의 기분 </p>

        <div className="flex justify-around">

            <Button className={emotion === 1 ? "bg-red-300" : ""} onClick={()=>{clickedEmotion(1)}}>
                <Img src="/assets/images/sample_angry.png"/></Button>
            <Button className={emotion === 2 ? "bg-blue-300" : ""} onClick={()=>{clickedEmotion(2)}}>
                <Img src="/assets/images/sample_bad.png"/></Button>
            <Button className={emotion === 3 ? "bg-amber-300" : ""} onClick={()=>{clickedEmotion(3)}}>
                <Img src="/assets/images/sample_good.png"/></Button>
            <Button className={emotion === 4 ? "bg-green-300" : ""} onClick={()=>{clickedEmotion(4)}}>
                <Img src="/assets/images/sample_soso.png"/></Button>
            <Button className={emotion === 5 ? "bg-purple-300" : ""} onClick={()=>{clickedEmotion(5)}}>
                <Img src="/assets/images/sample_tired.png"/></Button>
        </div>
        <br/>
        <div className="h-[30%]">
            <textarea onChange={e=>setContent(e.target.value)} placeholder="내용을 입력" className="text-[17px] h-[100%] w-[97%] ext-[#9d9d9d]"/>
        </div>
        <br/>
        <div >
            <div className="flex justify-between">
            <Label htmlFor="input-file">업로드</Label><p className="text-gray-400">※ 10MB 이하 png,jpg,jpeg파일</p>
            <input type="file" multiple id="input-file"
                   className="signup-profileImg-input"
                   accept="image/jpg,image/png,image/jpeg,image/gif"
                   onChange={saveImgFiles}
                   ref={imgRef}
                   style={{display: "none"}}/>
            </div>


            <div className="flex">
                {imgFiles.length > 0 ? (
                    imgFiles.map((imgFile, index) => (

                        <div>
                            <button className="relative top-1/4 hover:bg-gray-400 hover:rounded-lg active:scale-90" onClick={()=>{fileChange(index)}}><CircleX/></button>
                            <img
                                key={index}
                                src={imgFile}
                                alt={`Image ${index}`}
                                className="mt-5 mr-5 w-[150px] aspect-[1]"
                            />
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    </div>
    return (

        <BottomUpModal children={children} writeButton={writeButton}/>);
}

