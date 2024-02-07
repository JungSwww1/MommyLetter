import axios from 'axios'
import {getUserData} from "@/apis/User/userApi";
import {useNavigate} from "react-router-dom";

const AUTH_BASE_URL = `http://i10a509.p.ssafy.io:8081/auth`

interface loginData {
    email : string;
    password : string;
}

interface registData {
    email : string;
    password : string;
    nickname : string;
}

interface consultData {
    phone: string;
    pregnancyStatus: string;
    extra: string;
    diaryOpen: boolean;
}

// 로그인
export const loginAPI = async (data: loginData) => {
    try {
        const response = await axios.post(`${AUTH_BASE_URL}/user-login`, data);
        if (response.status === 200) {
            const token = response.data; // 적절한 토큰 속성으로 수정
            localStorage.setItem('token', token);

            // JWT를 '.' 기준으로 분리하여 Header, Payload, Signature 부분 추출
            const [header, payload, signature] = token.split('.');
            // Base64 디코딩
            const decodedHeader = atob(header);
            const decodedPayload = atob(payload);
            // JSON 파싱
            const headerObj = JSON.parse(decodedHeader);
            const payloadObj = JSON.parse(decodedPayload);
            // 디코딩된 정보 출력
            console.log('Payload:', payloadObj);

            const userId = payloadObj.sub;

            getUserData(userId)
                .then((fulldata) => {
                    const UserData = { nickname: fulldata.nickname, userId: userId };
                    const UserDataJSON = JSON.stringify(UserData); // 객체를 JSON 문자열로 변환
                    localStorage.setItem('Auth', UserDataJSON);
                })
                .catch((error) => {
                    handleApiError('getUserData 호출 중 오류 발생: ', error);
                });
        }
    } catch (error) {
        handleApiError('로그인하는 중 오류 발생: ', error);
    }
};

// 회원가입
export const registAPI = async (data:registData) => {
    try {
        const res = await axios.post(`${AUTH_BASE_URL}/signup`, data)
    } catch (error) {
        handleApiError('회원가입하는 중 오류 발생: ', error);
    }
}

// 상담 정보 등록
export const addConsultInfoAPI = async (userId:number, data:consultData) => {
    try {
        const response = await axios.post(`${AUTH_BASE_URL}/consult-info/${userId}`, data)
    } catch (error) {
        handleApiError('상담 정보 등록을 하는 중 오류 발생 : ',error)
    }
}


const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};