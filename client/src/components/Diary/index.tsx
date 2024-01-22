import React from "react";
import {Diary, Input, Title, Select,Img,Label} from './styles';
import angry from '@/assets/images/sample_angry.png'
import bad from '@/assets/images/sample_bad.png'
import good from '@/assets/images/sample_good.png'
import soso from '@/assets/images/sample_soso.png'
import tired from '@/assets/images/sample_tired.png'


export const DiaryPage = () => {
    return (<Diary>
        <Title>산모일기</Title>
        {/* On Off 버튼 */}
        <Input>체크버튼</Input><input type="checkbox"/>
    </Diary>);
}

export const DiaryWrite = () => {
    const today = new Date();
    const year = `${today.getFullYear()}`
    const month = `${today.getMonth() + 1}`
    const day = `${today.getDate()}`;

    return (<div className="flex flex-col ml-5 h-[80%]">
        <p className="text-[15px] font-bold text-black">날짜 선택</p>
        <div className="flex justify-around">
            <Select> <option value="year">{year}</option> </Select>
            <Select> <option value="month">{month}</option> </Select>
            <Select> <option value="day"> {day}</option></Select>
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
        <div className="h-[80%]">
            <textarea placeholder="내용을 입력" className="text-[17px] h-[50%] w-[100%] ext-[#9d9d9d]"/>
        </div>
    <br/>
        <div>
            <Label htmlFor="input-file">업로드</Label>
            <input type="file" id="input-file" style={{display: "none"}}/>
        </div>
    </div>);
}
