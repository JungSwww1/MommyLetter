// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";

// axios 객체 생성
const axios = LocalAxios();

// 특정 사용자의 상담기록 리스트를 가져오는 함수
export const fetchHistoryList = async (userId: number) => {
    try {
        const res = await axios.get(`/consults/${userId}`)
        return res.data;
    } catch (err: any) {
        console.log('Register err : ', err.response);
        const statusCode = err.response.status; // 400
        const statusText = err.response.statusText; // Bad Request
        const message = err.response.data.message[0]; // id should not be empty
        console.log(`${statusCode} - ${statusText} - ${message}`);

    }
};


// 특정 사용자의 상담기록 디테일을 가져오는 함수
export const fetchHistoryDetail = async (counselingId: number) => {
    try {
        const res = await axios.get(`/consults/list/${counselingId}`)
        return res.data;
    } catch (err: any) {
        console.log('Register err : ', err.response);
        const statusCode = err.response.status; // 400
        const statusText = err.response.statusText; // Bad Request
        const message = err.response.data.message[0]; // id should not be empty
        console.log(`${statusCode} - ${statusText} - ${message}`);

    }
};