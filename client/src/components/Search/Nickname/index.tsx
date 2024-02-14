import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ReactComponent as Send} from "@/assets/icons/send.svg";
import {fetchDMList, startDM} from "@/apis/DM/DMAPI";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";

interface NicknameProps {
    userId: number,
    nickname: string,
    intro: string,
    backgroundPhoto: string,
    profilePhoto: string,
    follower: number,
    following: number
}

interface DMProps {
    userId: number;
    chatGroupId: number;
}

const NicknameComponent: React.FC<{ nicknameList: NicknameProps[] }> = ({nicknameList}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<number>();
    const [myDMList, setMyDMList] = useState<DMProps[]>([])
    useEffect(() => {
        setUser(Number(MommyLetterWS.getInstance().getUserInfo()["userId"]));

    }, []);
    useEffect(() => {
        if (!user) return;
        fetchDMList(user).then((response) => {
            response.map((dm: any) => {
                const dmList: DMProps[] = response.map((dm: any) => ({
                    chatGroupId: Number(dm.chatGroupId),
                    userId: user == Number(dm.chatRoomName.split("_")[2]) ? Number(dm.chatRoomName.split("_")[1]) : Number(dm.chatRoomName.split("_")[2])
                }));
                setMyDMList(dmList);
            });
        })
    }, [user]);
    const goProfile = (userId: number) => {
        navigate(`/profile/${userId}`)
    }
    const goDm = async (otherUserId: number) => {
        if (!user) return;
        const isUsed = myDMList.find((tempUser: DMProps) => tempUser.userId === otherUserId)
        if (isUsed) return navigate(`/message/${isUsed.chatGroupId}`);
        await startDM(user, otherUserId)
            .then(response => {
                setMyDMList(prevState => [...prevState, response, otherUserId])
                navigate(`/message/${response}`);
            });

    }
    return (<div className="w-[100%]">
            {nicknameList.map((nicknameItem, index) => (
                <div key={index} className="flex justify-between items-center ml-5 h-[13%] w-[100%] ">
                    <img className="w-[15%]  rounded-full hover:scale-125 duration-300" src={`${nicknameItem.profilePhoto  ? "/userimages/"+nicknameItem.profilePhoto.substring(72,) : "/assets/images/default_image.png"}`} />
                    <button onClick={() => goProfile(nicknameItem.userId)}
                            className="duraaation-300 hover:scale-125 duration-300">{nicknameItem.nickname}</button>
                    <button onClick={() => goDm(nicknameItem.userId)}
                            className="hover:scale-125 duration-300 w-[10%] h-[10%]"><Send/></button>

                </div>))}

        </div>);
};
export default NicknameComponent;