export interface DiaryWriteRequestProps {
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
