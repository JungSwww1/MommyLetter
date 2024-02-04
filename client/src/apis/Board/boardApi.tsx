import axios from "axios";

const BASE_URL = "http://i10a509.p.ssafy.io:8081/boards";
const BOARDLIKE_BASE_URL = "http://i10a509.p.ssafy.io:8081/likes/boards";

interface sendBoard {
    userId : number;
    boardId : number;
}

export const allBoardListAPI = async (userId:number) => {
    try {
        const response = await axios.get(`${BASE_URL}/list/${userId}`);
        return response.data
    } catch (error) {
        handleApiError('사용자 내용을 가져오는 중 오류 발생: ', error)
    }
}

// 사용자가 누른 게시물 좋아요 정보 (좋아요 표시용)
export const boardLikeAPI = async(userId:number, boardId:number) => {
    try {
        const response = await axios.get(`${BOARDLIKE_BASE_URL}/${boardId}/${userId}`)
        const isPressed = response.data
        if(isPressed) {
            return Promise.resolve(true)
        } else {
            return Promise.resolve(false)
        }
    } catch(error) {
        handleApiError('사용자가 누른 좋아요 가져오는 중 오류 발생 : ', error)
    }
}

// 게시물 좋아요 숫자
export const countBoardLike = async(boardId:number) => {
    try {
        const response = await axios.get(`${BOARDLIKE_BASE_URL}/${boardId}`)
        return response.data
    } catch(error) {
        handleApiError('게시물 좋아요 숫자를 가져오는 중 오류 발생 : ',error)
    }
}

// 게시물 좋아요 누르기
export const sendBoardLikeAPI = async(data:sendBoard) => {
    try{
        const response = await axios.post(`${BOARDLIKE_BASE_URL}`,data)
    } catch (error) {
        handleApiError('게시물 좋아요 정보를 보내는 중 오류 발생: ', error)
    }
}

// 게시물 좋아요 취소
export const sendBoardUnlikeAPI = async(userId:number, boardId:number)=> {
    try{
        const response = await axios.delete(`${BOARDLIKE_BASE_URL}/${boardId}/${userId}`)
    } catch(error) {
        handleApiError('게시물 좋아요 취소 정보를 보내는 중 오류 발생: ', error)
    }
}


// 에러 처리
const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};