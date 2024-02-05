import React from "react";
import {DiaryResponseProps,PhotoListProps} from "@/components/type/types";

export const DiaryListComponent = ({content,emoji,photoList,createdDate }:DiaryResponseProps) => {
    const date = new Date(createdDate);
    const letterCheck = (num:number) =>{
        const parseNum = num.toString();
        return parseNum.length < 2 ? "0" + parseNum : parseNum;
    }
    return (
        <div className="p-5">
            <div>
                <div className="flex justify-between">
                    <span className="font-bold">{date.getFullYear()}. {letterCheck(date.getMonth()+1)}.{date.getDate()}</span>
                    이모지{emoji}
                </div>
                <div className="text-gray-400">{letterCheck(date.getHours())}:{letterCheck(date.getMinutes())}</div>
                <div>{content}</div>
            </div>
            <div className="flex">
                {photoList.map((photo, index) => (
                    <img
                        key={index}
                        className="w-[200px] h-[150px] mt-5 mr-3"
                        src={photo.path}
                        alt={`Picture ${index + 1}`}/>
                ))}
            </div>
        </div>
    );
};

export default DiaryListComponent;