import axios from "axios";

const BASE_URL = "http://localhost:8080/boards";
const BOARDLIKE_BASE_URL = "http://localhost:8080/likes/boards";
const COMMENTLIKE_BASE_URL = "http://localhost:8080/likes/comments"

interface sendBoard {
    userId : number;
    boardId : number;
}

export const allBoardList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        handleApiError('사용자 내용을 가져오는 중 오류 발생: ', error)
    }
}

export const sendBoardLikeAPI = async(data:sendBoard) => {
    try{
        const response = await axios.post(`${BOARDLIKE_BASE_URL}`,data)
    } catch (error) {
        handleApiError('게시물 좋아요 정보를 보내는 중 오류 발생: ', error)
    }
}


const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};