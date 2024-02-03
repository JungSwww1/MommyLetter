import React, {useEffect, useState} from "react";
import {Img, Label, Select} from './styles';
import angry from '@/assets/images/sample_angry.png'
import bad from '@/assets/images/sample_bad.png'
import good from '@/assets/images/sample_good.png'
import soso from '@/assets/images/sample_soso.png'
import tired from '@/assets/images/sample_tired.png'
import BottomUpModal from "@/components/Modal";
interface DateProps{
    currYear:string;
    currMonth:string;
    currDay:string;
}

export const DiaryWrite = ({currYear, currMonth, currDay}:DateProps) => {
    const today = new Date();
    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState(currYear);
    const [selectedMonth, setSelectedMonth] = useState(currMonth);
    const [selectedDay, setSelectedDay] = useState(currDay);
    const [endDay, setEndDay] = useState<number>(0);
    useEffect(() => {
        // 현재 날짜 기준으로 최대 년도를 보여준다.
        const newYears = [];
        const newMonths = [];
        for (let i = 2000; i <= parseInt(currYear); i++) newYears.push(i);
        for (let i = 1; i <= 12; i++) newMonths.push(i);
        setYears(newYears);
        setMonths(newMonths);

        // 선택된 년도와 월을 확인 후 최대 일을 반환
            const lastDay = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
            setEndDay(lastDay);
            const newDays = [];
            for (let i = 1; i <= lastDay; i++) newDays.push(i);
            setDays(newDays);
    }, [selectedYear, selectedMonth]);

    const children = <div className="flex flex-col ml-5 w-[98%] h-[100%]">
        <p className="text-[15px] font-bold text-black">날짜 선택</p>
        <div className="flex justify-around">

            <Select onChange={e => setSelectedYear(e.target.value)}>
                {years.map((year, index) => (<option key={index} value={year} selected={year==parseInt(currYear)}
                >{year} </option>))}
            </Select>
            <Select onChange={e => setSelectedMonth(e.target.value)}>
                {months.map((month, index) => (<option key={index} value={month} selected={month=== parseInt(currMonth)}>{month}</option>))}
            </Select>
            <Select onChange={e => setSelectedDay(e.target.value)}>
                {days.map((day, index) => (<option key={index} value={day} selected={day===parseInt(currDay)} >{day}</option>))}
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
        <div className="h-[30%]">
            <textarea placeholder="내용을 입력" className="text-[17px] h-[100%] w-[97%] ext-[#9d9d9d]"/>
        </div>
        <br/>
        <div>
            <Label htmlFor="input-file">업로드</Label>
            <input type="file" id="input-file" style={{display: "none"}}/>
        </div>
    </div>
    return (

        <BottomUpModal children={children}/>);
}

