import LocalAxios from "@/util/localAxios";
import {getUserData} from "@/apis/User/userApi";
import {
    loginDataRequestProps,
    registDataRequestProps,
    consultDataRequestProps,
    pwdChangeRequestProps
} from "@/apis/type/types"

const axios = LocalAxios();
// 로그인
export const loginAPI = async (data:loginDataRequestProps) => {
    try {
        const response = await axios.post(`auth/user-login`, data);
        if(response.data.status === 500) {
            return Promise.resolve(false);
        } else {
            const token = response.data; // 토큰 속성으로 수정
            // localStorage.setItem('token', token);

            // JWT를 '.' 기준으로 분리하여 Header, Payload, Signature 부분 추출
            const [header, payload,signature] = token.split('.');
            // Base64 디코딩 및 JSON 파싱
            const payloadObj = JSON.parse(atob(payload));
            const userId = payloadObj.sub;

            const fullData = await getUserData(userId);
            const userData = { nickname: fullData.nickname, userId: userId, email:fullData.email };
            localStorage.setItem('Auth', JSON.stringify(userData));
            return Promise.resolve(true);
        }
    } catch (error) {
        handleApiError('로그인 또는 사용자 데이터 호출 중 오류 발생: ', error);
        return Promise.resolve(false);
    }
};

// 회원가입
export const registAPI = async (data:registDataRequestProps) => {
    try {
        const res = await axios.post(`auth/signup`, data)
    } catch (error) {
        handleApiError('회원가입하는 중 오류 발생: ', error);
    }
}

// 상담 정보 등록
export const addConsultInfoAPI = async (userId:number, data:consultDataRequestProps) => {
    try {
        const response = await axios.post(`auth/consult-info/${userId}`, data)
    } catch (error) {
        handleApiError('상담 정보 등록을 하는 중 오류 발생 : ',error)
    }
}

//비밀번호 수정
export const pwdChangeAPI = async (userId:number, data:pwdChangeRequestProps) => {
    try {
        const response = await axios.patch(`auth/changepwd/${userId}`, data)
        return response
    } catch (error) {
        handleApiError('비밀번호 수정을 하는 중 오류 발생 : ',error)
    }
}

// 회원탈퇴
export const deleteUserAPI = async (userId:number) => {
    try {
        const response = await axios.delete(`auth/${userId}`)
        return response
    } catch (error) {
        handleApiError('회원 탈퇴를 하는 중 오류 발생 : ',error)
    }
}

const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};