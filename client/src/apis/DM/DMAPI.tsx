// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";


// axios 객체 생성
const axios = LocalAxios();

// DMList를 가져오는 함수
export const fetchDMList = (userId:number) => {
    return axios.get(`/dm/${userId}`).then(response => {
        return response.data;
    }).catch((error) => console.error(error));
};

// DM 대화기록을 가져오는 함수
export const fetchChatList = (user1Id:number,user2Id:number) => {
    return axios.get(`/dm/list/${user1Id}/${user2Id}`).then(response => {

        return response.data;
    }).catch((error) => console.error(error));
};

// 대화를 시작하는 함수(한 번만)
export const startDM = (user1Id:number,user2Id:number) => {
    return axios.get(`/dm/start/${user1Id}/${user2Id}`).then(response => {
        return response.data;
    }).catch((error) => console.error(error));
};

// 대화를 시작하는 함수
export const enterDM = (userId:number,otherUserId:number) => {
    return axios.get(`/dm/enter/${userId}/${otherUserId}`).then(response => {
        console.log(response.data);
        console.log("채팅방에 입장")
    }).catch((error) => console.error(error));
};

// 대화방에서 입장 함수
export const leaveDM = (userId:number,otherUserId:number) => {
    return axios.get(`/dm/leave/${userId}/${otherUserId}`).then(response => {
        console.log(response.data);
        console.log("나가기")
    }).catch((error) => console.error(error));
};
