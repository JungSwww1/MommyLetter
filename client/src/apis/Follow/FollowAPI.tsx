import axios from 'axios'
import {FollowRes} from "@/apis/type/types";

const FOLLOW_BASE_URL = `http://i10a509.p.ssafy.io:8081/follows`

export const getFollowerAPI = async (userId:number) => {
    try {
        const response = await axios.get(`${FOLLOW_BASE_URL}/follower/${userId}`)
        return response.data
    } catch (error) {
        handleApiError('팔로워를 가져오는 중 오류 발생 : ',error)
    }
}

export const getFollowingAPI = async (userId:number) => {
    try {
        const response = await axios.get(`${FOLLOW_BASE_URL}/following/${userId}`)
        return response.data
    } catch (error) {
        handleApiError('팔로잉을 가져오는 중 오류 발생 : ',error)
    }
}

//팔로우 확인 여부
export const isFollowAPI = async (user1Id:number, user2Id:number) => {
    try {
        const response = await axios.get(`${FOLLOW_BASE_URL}/check/follow/${user1Id}/${user2Id}`)
        const isFollow = response.data
        if(isFollow) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    } catch (error) {
        handleApiError('팔로우 확인을 하는 중 오류 발생 : ', error)
        return Promise.reject(false);
    }
}

export const doFollowAPI = async (userId:number, data:FollowRes) => {
    try {
        const response = await axios.post(`${FOLLOW_BASE_URL}/${userId}`, data)
    } catch (error) {
        handleApiError('팔로우 요청을 보내는 중 오류 발생 : ', error)
    }
}

export const deleteFollowAPI = async (userId:number, data:FollowRes) => {
    try {
        const response = await axios.post(`${FOLLOW_BASE_URL}/unfollow/${userId}`, data)
    } catch (error) {
        handleApiError('팔로우 취소를 하는 중 오류 발생 : ', error)
    }
}
const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};