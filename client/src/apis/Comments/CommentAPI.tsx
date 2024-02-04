import axios from "axios";

const COMMENT_BASE_URL = "http://i10a509.p.ssafy.io:8081/comments";
const COMMENTLIKE_BASE_URL = "http://i10a509.p.ssafy.io:8081/likes/comments";

export const getAllCommentsAPI = async (boardId:number) => {
    try {
        const response = await axios.get(`http://i10a509.p.ssafy.io:8081/comments/${boardId}`);
        return response.data;
    } catch (error) {
        handleApiError('댓글 전체 정보를 가져오는 중 오류 발생: ', error)
    }
}



const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};