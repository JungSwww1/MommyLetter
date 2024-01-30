export interface HashTagComponentProps {
    title:string,
    count:number,
};
export interface DoctorListCardComponentProps{
    date: string;
    img: string;
    name: string;
    gender: string;
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
    type: 'chat-start' | 'chat-end';
    name: string;
    time: string;
    message: string;
    status: string;
    imageUrl: string;
};

export interface DiaryListProps{
    date: string;
    createdTime: string;
    isUpdate: boolean;
    feeling: string;
    content: string;
    pictures: string[];
}


export interface ProfileProps{
    name: string;
    intro: string;

}