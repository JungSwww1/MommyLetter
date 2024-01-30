import React, {useState} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import {DiaryLayout, Img, Label, Select} from './styles';
import angry from '@/assets/images/sample_angry.png'
import bad from '@/assets/images/sample_bad.png'
import good from '@/assets/images/sample_good.png'
import soso from '@/assets/images/sample_soso.png'
import tired from '@/assets/images/sample_tired.png'


export const DiaryHeader = () => {
    const [isToggled, setToggled] = useState(false);
    const navigate = useNavigate();
    const handleToggle = () => {
        setToggled(!isToggled);
        isToggled ? navigate("/diary/mom") : navigate("/diary/baby")
    };

        return (<DiaryLayout>
            <span className="font-bold text-xl">{isToggled ? "육아일기" : "산모일기"}</span>
            {/* On Off 버튼 */}
            <label className="swap">
                <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                    <div className="slider"></div>
                </div>
            </label>
        </DiaryLayout>);
}
export const DiaryWrite = () => {
    const today = new Date();
    const year = `${today.getFullYear()}`
    const month = `${today.getMonth() + 1}`
    const day = `${today.getDate()}`;

    return (
    <div className="flex flex-col ml-5 w-[98%] h-[100%]">
        <p className="text-[15px] font-bold text-black">날짜 선택</p>
        <div className="flex justify-around">
            <Select>
                <option value="year">{year}</option>
            </Select>
            <Select>
                <option value="month">{month}</option>
            </Select>
            <Select>
                <option value="day"> {day}</option>
            </Select>
        </div>
        <p className="text-[15px] font-bold text-black mt-5"> 오늘의 기분 </p>

        <div className="flex justify-around">
            <Img src={angry}/>
            <Img src={bad}/>
            <Img src={good}/>
            <Img src={soso}/>
            <Img src={tired}/>
        </div>
        <br/>
        <div className="h-[50%]">
            <textarea placeholder="내용을 입력" className="text-[17px] h-[100%] w-[97%] ext-[#9d9d9d]"/>
        </div>
        <br/>
        <div>
            <Label htmlFor="input-file">업로드</Label>
            <input type="file" id="input-file" style={{display: "none"}}/>
        </div>
    </div>);
}
