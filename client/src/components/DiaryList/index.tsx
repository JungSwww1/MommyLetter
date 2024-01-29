import React,{FC} from "react";
import DiaryPictures from "@/components/DiaryPictures";
import {DiaryListProps} from "@/components/type/types";


export const DiaryListComponent = ({ date,feeling,createdTime,content,pictures }:DiaryListProps) => {

    return (
        <div className="p-5">
            <div>
                <div className="flex justify-between">
                    <span className="font-bold">{date}</span>
                    <span><img className="h-[40px]" src={feeling} alt="Feeling Icon" /></span>
                </div>
                <div className="text-gray-400">{createdTime}</div>
                <div>{content}</div>
            </div>
            <DiaryPictures pictures={pictures}/>
        </div>
    );
};

export default DiaryListComponent;