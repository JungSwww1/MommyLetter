import LocalAxios from "@/util/localAxios";
import {EditBoardRequestProps, SendBoardRequestProps} from "@/apis/type/types";


const axios = LocalAxios();

const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
};
// 게시물 등록
export const writeBoardAPI = async (data:FormData) => {
    console.log(data)
    try {
        const response = await axios.post(`/boards`, data, config)
    } catch (error) {
        handleApiError('게시물을 등록하는 중 오류 발생 : ', error)
    }
}

// 게시물 삭제
export const deleteBoardAPI = async (boardId:number) => {
    try {
        const response = await axios.delete(`/boards/${boardId}`)
    } catch (error) {
        handleApiError('게시물을 삭제하는 중 오류 발생 : ', error)
    }
}

//게시물 수정
export const editBoardAPI = async (boardId: number, data: {
    access: string;
    hashtagList: string[];
    category: string;
    content: string
}) => {
    try {
        const response = await axios.patch(`/boards/${boardId}`, data)
    } catch (error) {
        handleApiError('게시물 수정을 하는 중 오륲 발생 : ', error)
    }
}

export const allBoardListAPI = async (userId:number) => {
    try {
        const response = await axios.get(`boards/list/${userId}`);
        return response.data
    } catch (error) {
        handleApiError('사용자 내용을 가져오는 중 오류 발생: ', error)
    }
}

// 사용자가 누른 게시물 좋아요 정보 (좋아요 표시용)
export const boardLikeAPI = async(userId:number, boardId:number) => {
    try {
        const response = await axios.get(`likes/boards/${boardId}/${userId}`)
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
        const response = await axios.get(`likes/boards/${boardId}`)
        return response.data
    } catch(error) {
        handleApiError('게시물 좋아요 숫자를 가져오는 중 오류 발생 : ',error)
    }
}

// 게시물 좋아요 누르기
export const sendBoardLikeAPI = async(data:SendBoardRequestProps) => {
    try{
        const response = await axios.post(`likes/boards`,data)
    } catch (error) {
        handleApiError('게시물 좋아요 정보를 보내는 중 오류 발생: ', error)
    }
}

// 게시물 좋아요 취소
export const sendBoardUnlikeAPI = async(userId:number, boardId:number)=> {
    try{
        const response = await axios.delete(`likes/boards/${boardId}/${userId}`)
    } catch(error) {
        handleApiError('게시물 좋아요 취소 정보를 보내는 중 오류 발생: ', error)
    }
}

// 해당유저에 대한 게시물 사진만 가져오기
export const getProfileBoardAPI = async (userId:number) => {
    try{
        const response = await axios.get(`/boards/user/${userId}`)
        return response.data
    } catch (error) {
        handleApiError('해당 유저에 대한 게시물 사진을 가져오는 중 오류 발생 : ',error)
    }
}

// boardId에 맞는 게시물 하나 가져오기
export const getOneBoardAPI = async (boardId:number) => {
    try {
        const response = await axios.get(`/boards/${boardId}`)
        return response.data
    } catch (error) {
        handleApiError('boardId에 해당하는 게시물을 가져오는 중 오류 발생 : ',error)
    }
}

// 에러 처리
const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};