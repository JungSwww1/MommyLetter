export interface DiaryWriteRequestProps {
    userId: number;
    content: string;
    category: string;
    emoji: number;
    createdDate: string;
    emoticon: {
        emotionList: string[]; familyList: string[]; healthList: string[]; peopleList: string[]; weatherList: string[];
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
        emotionList: string[]; familyList: string[]; healthList: string[]; peopleList: string[]; weatherList: string[];
    } | null;
}

export interface LoginDataRequestProps {
    email: string;
    password: string;
}

export interface RegistDataRequestProps {
    email: string;
    password: string;
    nickname: string;
}

export interface ConsultDataRequestProps {
    phone: string;
    pregnancyStatus: string;
    extra: string;
    diaryOpen: boolean;
}

export interface SendBoardRequestProps {
    userId: number;
    boardId: number;
}

export interface EditBoardRequestProps {
    content: string;
    access: string;
    category: string;
    hashTagList: string[];
}

export interface PwdChangeRequestProps {
    userId:number;
    nickname:string;
    intro:string;
    currentPassword:string;
    newPassword:string;
}
export interface ReservationReq {
    userId: number;
    doctorId: number;
    reserveDate: string;
}

export interface ConsultListRes {
    "counselingId": number;
    "userId": number;
    "name": string;
    "location": string;
    "department": string;
    "profilePhoto": string;
    "reserveDate": string;
    "prescriptionPath": string;
}


export interface ConsultDetailRes {
    "counselingId": number;
    "userId": number;
    "doctorName": string;
    "location": string;
    "department": string;
    "profilePhoto": string;
    "reserveDate": string;
    "userName": string;
    "prescriptionPath": string;
}

export interface PatientRes {
    reserveId: number;
    userId: number;
    doctorId: number;
    name: string;
    profilePhoto: string ;
    phone: string;
    gender: 'Male' | 'Female';
    status: string;
    extra: string;
    diaryOpen: string ;
    reserveDate: string;
    countReserve: number;
    consulted: boolean;
    ssn: string;
}

export interface PatientDetailRes{
    reserveId: number;
    userId: number;
    doctorId: number;
    name: string;
    profilePhoto: string;
    phone: string;
    gender: 'Male' | 'Female' ;
    status: string ;
    extra: string;
    diaryOpen: boolean;
    reserveDate: string;
    countReserve: number;
    consulted: boolean;
    ssn: string ;

}

export interface DoctorRes{
    "userId": number;
    "doctorId": number;
    "name": string;
    "location": string;
    "historyList": string[];
    "department": string;
    "validTime": string;
    "profilePhoto": string;
    "backgroundPhoto": string;
}
interface consultInfo {
    "userInfoId": number;
    "name": string;
    "ssn": string;
    "phone": string;
    "pregnancyStatus": string,
    "extra": string;
    "diaryOpen": boolean;
export interface FollowRes {
    userId:number;
}