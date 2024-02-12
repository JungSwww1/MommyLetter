export interface DiaryWriteRequestProps{
    userId:number;
    content:string;
    category: string;
    emoji:number;
    createdDate:string;
    emoticon: {
        emotionList: string[];
        familyList: string[];
        healthList: string[];
        peopleList: string[];
        weatherList: string[];
    }
    emoticonList: string[];
}

export interface DiaryUpdateRequestProps {
    diaryId: number;
    content: string;
    emoji: number;
    photoList: string[];
    createdDate: string;
    emoticonRequest: {
        emotionList: string[];
        familyList: string[];
        healthList: string[];
        peopleList: string[];
        weatherList: string[];
    } | null;
}

export interface loginDataRequestProps {
    email : string;
    password : string;
}

export interface registDataRequestProps {
    email : string;
    password : string;
    nickname : string;
}

export interface consultDataRequestProps {
    phone: string;
    pregnancyStatus: string;
    extra: string;
    diaryOpen: boolean;
}

export interface sendBoardRequestProps {
    userId : number;
    boardId : number;
}

export interface editBoardRequestProps {
    content: string;
    access: string;
    category: string;
    hashTagList: string[];
}