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