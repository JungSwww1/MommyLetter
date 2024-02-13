import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as Send} from "@/assets/icons/send.svg";
interface NicknameProps {
    userId: number,
    nickname: string,
    intro: string,
    backgroundPhoto: string,
    profilePhoto: string,
    follower: number,
    following: number
}
const NicknameComponent: React.FC<{ nicknameList: NicknameProps[] }> = ({ nicknameList }) => {
    const navigate = useNavigate();
    const move= (userId:number) => {
        navigate(`/profile/${userId}`)
    }
    const onSelect = (e:any) =>{
        console.log(e);
    }
    return (
        <div className="w-[100%]">
            <input type="file" onChange={onSelect} />
            {nicknameList.map((nicknameItem, index) => (
                <div key={index} className="flex justify-between items-center ml-5 h-[10%] w-[100%] " >
                    <img src={nicknameItem.profilePhoto} className="w-[15%]  rounded-full"/>
                    <button onClick={()=>move(nicknameItem.userId)} className="duraaation-300 active:scale-95">{nicknameItem.nickname}</button>
                    <Link to="/message"  className="hover:scale-125 duration-300 w-[10%] h-[10%]"><button><Send/></button></Link>
                </div>
            ))}
        </div>
    );
};
export default NicknameComponent;