import React, {useState} from "react";
import {DiaryResponseProps} from "@/components/type/types";

export const DiaryListComponent = ({content, emoji, photoList, createdDate}: DiaryResponseProps) => {
    const [modal, setModal] = useState(false);
    const date = new Date(createdDate);
    var emojiArr: string[] = [];
    const path = "/assets/images/"
    const emotionImg = ["1sad.png", "2lonely.png", "3irritated.png", "4tired.png", "5angry.png", "6soso.png", "7delight.png", "8calm.png", "9delight.png", "10excited.png"]
    for (let i = 0; i < 10; i++) {
        emojiArr[i] = path + emotionImg[i];
    }
    const letterCheck = (num: number) => {
        const parseNum = num.toString();

        return parseNum.length < 2 ? "0" + parseNum : parseNum;
    }

    return (

        <div className="w-[100%] p-5 relative bottom-10 z-0">


            <div className="flex w-[100%]">
                <div className="flex flex-col w-[25%]">
                    <span
                        className="font-bold text-pointColor">{letterCheck(date.getMonth() + 1)}월 {letterCheck(date.getDate())}일</span>
                    <img src={emojiArr[emoji]}/>
                </div>

                <div className="flex w-[75%] flex-col justify-between mb-5">

                <br/>
                    <div>{content}</div>
                    <div className="flex">
                        {photoList.map((photo, index) => (<img
                                key={index}
                                className="w-[200px] h-[150px] mt-5 mr-3"
                                src={`/diaryimages/${photo.path.substring(72,)}`}
                                alt={`Picture ${index + 1}`}/>))}
                    </div>
                </div>
            </div>

        </div>);
};

export default DiaryListComponent;