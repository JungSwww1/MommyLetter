import axios from "axios";

const BASE_URL = "http://i10a509.p.ssafy.io:8081/auth";

// 아이디에 해당하는 사용자 가져오기
export const getUserData = async (userId:number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        handleApiError('사용자 내용을 가져오는 중 오류 발생: ', error)
    }
};

// 사용자 정보 수정
export const updateUser = async (userId:number, userData:any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${userId}`, userData);
    } catch (error) {
        handleApiError('사용자 수정을 하는 중 오류 발생 : ', error)
    }
};

// 닉네임 중복 체크
export const nicknameCheck = async (nickname:string)=> {
    try{
        const response = await axios.get(`${BASE_URL}/signup/check-nickname`, {
            params: { nickname: nickname }
        });
        const isAvailable = response.data;
        if (isAvailable) {
            // console.log('닉네임 사용 불가 : 중복');
            return Promise.resolve(false);
        } else {
            // console.log('닉네임 사용 가능');
            return Promise.resolve(true);
        }
    } catch(error) {
        return Promise.reject(`닉네임 중복을 확인하는 오류 발생: ${error}`);
    }
}

// 이메일 중복 체크
export const emailCheckAPI = async (email:string) => {
    try {
        const response = await axios.get(`${BASE_URL}/signup/check-email`, {
            params: { email : email }
        });
        const isAvailable = response.data;
        if (isAvailable) {
            return Promise.resolve(false);
        } else {
            return Promise.resolve(true);
        }
    } catch (error) {
        return Promise.reject(`닉네임 중복을 확인하는 오류 발생: ${error}`);
    }
}

const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};