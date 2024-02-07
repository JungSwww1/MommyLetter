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
    doctorId: number;
    name: string;
    location: string;
    department: string;
    profilePhoto: string;
}