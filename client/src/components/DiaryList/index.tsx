import React,{FC} from "react";
import DiaryPictures from "@/components/DiaryPictures";


interface DiaryListProps{
    date: string;
    createdTime: string;
    isUpdate: boolean;
    feeling: string;
    content: string;
    pictures: string[];
}

export const DiaryListComponent: FC<{ props: DiaryListProps }> = ({ props }) => {

    return (
        <div className="p-5">
            <div>
                <div className="flex justify-between">
                    <span className="font-bold">{props.date}</span>
                    <span><img className="h-[40px]" src={props.feeling} alt="Feeling Icon" /></span>
                </div>
                <div className="text-gray-400">{props.createdTime}</div>
                <div>{props.content}</div>
            </div>
            <DiaryPictures pictures={props.pictures}/>
        </div>
    );
};

export default DiaryListComponent;