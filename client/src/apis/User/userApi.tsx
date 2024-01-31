import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const getUserData = async (userId:number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        handleApiError('사용자 내용을 가져오는 중 오류 발생: ', error)
    }
};

export const updateUser = async (userId:number, userData:any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${userId}`, userData);
    } catch (error) {
        handleApiError('사용자 수정을 하는 중 오류 발생 : ', error)
    }
};


const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};