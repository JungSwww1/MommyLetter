import axios from 'axios'

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

const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};