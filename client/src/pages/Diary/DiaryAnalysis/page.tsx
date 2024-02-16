import React, {useState} from 'react';
import MonthEmojiChartComponent from "@/components/EmojiChart/Month";
import YearEmojiChartComponent from "@/components/EmojiChart/Year";
import {ReactComponent as Activity} from "@/assets/icons/activity.svg";
import HorizontalChart from "@/components/EmojiChart/HorizontalChart";
import EmojiRank from "@/components/EmojiChart/EmojiRank";

const DiaryAnalysisPage: React.FC = () => {
    const [isYear, set] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<number>(1)

    const changeBtn = (num: number) => {
        setIsChecked(num);
    }
    const emojiArr: string[] = [];
    const path = "/assets/images/"
    const emotionImg = ["1sad.png", "2lonely.png", "3irritated.png", "4tired.png", "5angry.png", "6soso.png", "7delight.png", "8calm.png", "9delight.png", "10excited.png"]
    for (let i = 0; i < 10; i++) {
        emojiArr[i] = path + emotionImg[i];
    }
    return (<div className="flex flex-col items-center w-[100%] h-[100%] ">

            <div className="flex flex-row">
                <Activity/> <p className="font-bold text-xl"> 감정 분석 </p>

            </div>
            <br/>
            <div className="flex w-[100%] justify-around">
                <div className={`hover:text-MenuColor hover:font-bold ${isChecked == 1 && "font-bold text-MenuColor"}`}
                     onClick={() => changeBtn(1)}>월별
                </div>
                <div className={`hover:text-MenuColor hover:font-bold ${isChecked == 2 && "font-bold text-MenuColor"}`}
                     onClick={() => changeBtn(2)}>년별
                </div>
            </div>
            <br/>
            <hr/>
            <div className="flex flex-col w-[100%] h-[70%]">
                {isChecked == 1 && <MonthEmojiChartComponent/>}
                {isChecked == 2 && <YearEmojiChartComponent/>}
                <div>
                    <EmojiRank/>
                </div>
                <HorizontalChart/>
                <div className="flex w-[100%]">
                    <div className="w-[4%]"></div>
                    <div className="flex justify-around items-center w-[96%] h-[7%] ml-3 mr-2">
                        {emotionImg.map((response) => (<img className="h-[100%]" src={path + `${response}`}/>))}
                    </div>
                </div>
            </div>

        </div>);
};

export default DiaryAnalysisPage;
