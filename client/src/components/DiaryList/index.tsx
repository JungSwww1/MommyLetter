import React from "react";
import {DiaryListProps} from "@/components/type/types";


export const DiaryListComponent = ({ date,feeling,createdTime,content,pictures }:DiaryListProps) => {

    return (
        <div className="p-5">
            <div>
                <div className="flex justify-between">
                    <span className="font-bold">{date}</span>
                    <span><img className="h-[40px]" src={feeling} alt="Feeling Icon"/></span>
                </div>
                <div className="text-gray-400">{createdTime}</div>
                <div>{content}</div>
            </div>
            <div className="flex">
                {pictures.map((picture, index) => (
                    <img
                        key={index}
                        className="w-[200px] h-[150px] mt-5 mr-3"
                        src={picture}
                        alt={`Picture ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DiaryListComponent;