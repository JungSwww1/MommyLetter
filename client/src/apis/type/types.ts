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
    createdDate: string;
    photoList: string[];
    emoticon: {
        emotionList: string[];
        familyList: string[];
        healthList: string[];
        peopleList: string[];
        weatherList: string[];
    } | null;
}
