import React from 'react';

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
    return (
        <div className="w-[100%]">
            {nicknameList.map((nicknameItem, index) => (
                <div key={index} className="flex justify-around h-[10%] w-[100%]">
                    <img src={nicknameItem.profilePhoto} className="w-[15%] mr-5 rounded-full"/>
                    <p>{nicknameItem.nickname}</p>
                </div>
            ))}
        </div>
    );
};

export default NicknameComponent;
