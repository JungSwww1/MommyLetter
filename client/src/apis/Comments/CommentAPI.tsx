import axios from "axios";

const COMMENT_BASE_URL = "http://i10a509.p.ssafy.io:8081/comments";
const COMMENTLIKE_BASE_URL = "http://i10a509.p.ssafy.io:8081/likes/comments";

interface commentLike {
    userId : number;
    boardId : number;
    commentId : number;
}




// 모든 댓글 가져오기
export const getAllCommentsAPI = async (boardId:number) => {
    try {
        const response = await axios.get(`http://i10a509.p.ssafy.io:8081/comments/${boardId}`);
        return response.data;
    } catch (error) {
        handleApiError('댓글 전체 정보를 가져오는 중 오류 발생: ', error)
    }
}

// 댓글 좋아요 여부 가져오기
export const commentLikeAPI = async (commentId:number, userId:number) => {
    try {
        const response = await axios.get(`${COMMENTLIKE_BASE_URL}/${commentId}/${userId}`)
        const isPressed = response.data
        if(isPressed) {
            return Promise.resolve(true)
        } else {
            return Promise.resolve(false)
        }
    } catch (error) {
        handleApiError('댓글 좋아요 정보를 가져오는 중 오류 발생: ', error)
    }
}

// 댓글 좋아요 수 가져오기
export const countCommentLikeAPI = async (commentId:number) => {
    try {
        const response = await axios.get(`${COMMENTLIKE_BASE_URL}/${commentId}`)
        return response.data;
    } catch (error) {
        handleApiError('댓글 좋아요 수를 가져오는 중 오류 발생 : ', error)
    }
}

// 댓글 좋아요 누르기
export const sendCommentLikeAPI = async (data:commentLike) => {
    try {
        const response = await axios.post(`${COMMENTLIKE_BASE_URL}`, data)
    } catch (error) {
        handleApiError('댓글 좋아요를 누르는 중 오류 발생 : ', error)
    }
}

// 댓글 좋아요 취소 누르기
export const sendCommentUnlikeAPI = async (commentId:number, userId:number) => {
    try {
        const response = axios.delete(`${COMMENTLIKE_BASE_URL}/${commentId}/${userId}`)
    } catch (error) {
        handleApiError('댓글 좋아요 취소를 누르는 중 오류 발생 : ', error)
    }
}


const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};