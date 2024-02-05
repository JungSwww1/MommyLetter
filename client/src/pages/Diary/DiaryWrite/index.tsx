import React, {useEffect, useRef, useState} from "react";
import {Img, Label, Select} from './styles';
import BottomUpModal from "@/components/Modal";
import {fileExtensionValid} from "@/pages/Common/FileUpload";
import {createDiary} from "@/apis/diary/DiaryAPI";
import {DiaryWriteRequestProps} from "@/apis/type/types";
import {ReactComponent as CircleX} from "@/assets/icons/circleX.svg";

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
    const [emotion, setEmotion] = useState(0);
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
            });
        }
    };
const diaryWrite = () =>{
    const writeInfo: DiaryWriteRequestProps = {
        userId: 101,
        content: content,
        category: "Baby",
        createdDate: new Date().toISOString(), // 수정: Date.now().toString()을 new Date().toISOString()로 수정
        emoji: 0,
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
        console.log(response);
        alert("작성되었습니다.")
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
    const writeButton = <button className="btn btn-ghost bg-user" onClick={diaryWrite}>작성하기</button>
    const children = <div className="flex flex-col ml-5 mt-5 w-[98%] h-[100%]">

        <p className="text-[15px] font-bold text-black">날짜 선택</p>
        <div className="flex justify-around">
            <Select onChange={e => setSelectedYear(Number(e.target.value))} value={currYear}>
                {years.map((year, index) => (<option key={index} value={year}
                >{year} </option>))}
            </Select>
            <Select onChange={e => setSelectedMonth(Number(e.target.value))} value={currMonth}>
                {months.map((month, index) => (<option key={index} value={month}>{month}</option>))}
            </Select>
            <Select onChange={e => setSelectedDay(Number(e.target.value))} value={currDay}>
                {days.map((day, index) => (<option key={index} value={day}>{day}</option>))}
            </Select>
        </div>
        <p className="text-[15px] font-bold text-black mt-5"> 오늘의 기분 </p>

        <div className="flex justify-around">

            <button onClick={()=>{}}><Img src="/assets/images/sample_angry.png"/></button>
            <button><Img src="/assets/images/sample_bad.png"/></button>
            <button><Img src="/assets/images/sample_good.png"/></button>
            <button><Img src="/assets/images/sample_soso.png"/></button>
            <button><Img src="/assets/images/sample_tired.png"/></button>
        </div>
        <br/>
        <div className="h-[30%]">
            <textarea onChange={e=>setContent(e.target.value)} placeholder="내용을 입력" className="text-[17px] h-[100%] w-[97%] ext-[#9d9d9d]"/>
        </div>
        <br/>
        <div >
            <div className="flex justify-between">
            <Label htmlFor="input-file">업로드</Label><p className="text-gray-400">※ 10MB 이하 png,jpg,jpeg파일</p>
            <input type="file" id="input-file"
                   className="signup-profileImg-input"
                   accept="/assets/images/*"
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

