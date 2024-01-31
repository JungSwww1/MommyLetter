import axios from "axios";

const BASE_URL = "http://localhost:8080/boards";

export const allBoardList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        handleApiError('사용자 내용을 가져오는 중 오류 발생: ', error)
    }
}


const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};