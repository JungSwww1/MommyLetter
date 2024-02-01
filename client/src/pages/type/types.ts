export interface ConsultProps{
    name:string;
    intro:string;
    history:string[];
}

export interface DiaryRequestProps{
    category:string;
    content:string;
    diaryId:number;
    emoji:number;
    photoList:string[];
    createdDate:string;
    updatedDate:string;
}
