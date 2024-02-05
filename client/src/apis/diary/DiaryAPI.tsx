// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";

// axios 객체 생성
const axios = LocalAxios();
import {DiaryWriteRequestProps,DiaryUpdateRequestProps} from "@/apis/type/types";

// Diary 인터페이스 정의


// 일기 생성 함수
export const createDiary = async (data: DiaryWriteRequestProps) => {
    await axios.post('/diary', data).
    then((response)=>console.log(response.data)).
    catch((error)=>console.log(error.response.data.message))
};

// 특정 사용자의 일기를 가져오는 함수
export const fetchDiary = (userId: number) => {
    return axios.get('/diary/user/' + userId).then(response => {return response.data;}).
    catch((error)=>console.error(error));
};

// 기존의 일기를 업데이트하는 함수
export const updateDiary = async (data: DiaryUpdateRequestProps) => {

    await axios.patch(`/diary/${data.diaryId}`, data).then((response)=>console.log(response.data)).
    catch((error)=>console.log(error.response.data.message)) //메시지를 지정해 준 경우);

};

// 특정 일기를 삭제하는 함수
export const deleteDiary = async (diaryId: number) => {
    await axios.delete(`/diary/${diaryId}`).then((response)=>console.log(response.data)).catch((error)=>console.error(error));
};