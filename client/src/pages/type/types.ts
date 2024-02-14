export interface ConsultProps {
    name: string;
    intro: string;
    history: string[];
}

export interface DiaryReadResponseProps {
    category: string;
    content: string;
    diaryId: number;
    emoji: number;
    photoList: PhotoProps[];
    createdDate: string;
    emoticon: {
        emotionList: string[]; familyList: string[]; healthList: string[]; peopleList: string[]; weatherList: string[];
    } | null
}

export interface PhotoProps {
    path: string;
}

export interface DoctorProfileProps {
    doctorId: string;
    name: string;
    location: string;
    department: string;
    profilePhoto: string;
}

export interface HistoryListProps{
    counselingId: number;
    userId: number;
    name: string;
    location: string;
    department: string;
    profilePhoto: string;
    reserveDate: string;
    prescriptionPath: string;
}

export interface HistoryDetailProps{
    counselingId: number;
    department: string;
    doctorName: string;
    location: string;
    prescriptionPath: string;
    profilePhoto: string;
    reserveDate: string;
    userId: number;
    userName: string;
}

export interface BoardProps {
    boardId: number;
    content: string;
    access : string;
    createdDate: string;
    category:string;
    updatedDate: string;
    hashTagList: { content: string; }[];
    photoList: { path: string; }[];
    accountSimpleReponse: {
        nickname: string;
        userId : number;
        profilePhoto: string;
    };
}

export interface CommentProps {
    commentId: number;
    userId: number;
    content: string;
    createdDate: string;
    updatedDate: string;
    nickname: string;
}

export interface ProfileProps {
    userId:number;
    nickname:string;
    intro:string;
    backgroundPhoto:string;
    profilePhoto: string;
    follower:number;
    following:number;
}

export interface UserProps {
    nickname: string;
    userId: string;
    role: string;
}