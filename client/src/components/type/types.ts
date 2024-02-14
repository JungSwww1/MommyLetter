export interface HashTagComponentProps {
    title:string,
    count:number,
};
export interface DoctorListCardComponentProps{
    date: string;
    img: string;
    name: string;
    department: string;
};

export interface UserListCardComponentProps{
    img: string;
    name: string;
    gender: string;
    age: number;
    time: string;
    reserveTime: string;
};

export interface DirectMessageComponentProps {
    type: boolean;
    name: string;
    time: string;
    message: string;
    status: string;
    imageUrl: string;
};

export interface DiaryResponseProps{
    content:string;
    emoji:number;
    photoList:PhotoListProps[];
    createdDate:string;
}

export interface PhotoListProps{
    path: string;
}

export interface ProfileProps{
    profilePhoto:string;
    name: string;
    intro: string;

}

export interface DirectMessageCardProps{
    nickname: string;
    profileUrl: string;
    date: string;
    content: string;
    chatGroupId: number;
}