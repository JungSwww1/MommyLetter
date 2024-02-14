// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";
import {ReservationReq} from "@/apis/type/types";


// axios 객체 생성
const axios = LocalAxios();

// Diary 인터페이스 정의

// 진료 예약
export const createReservation = async (data: ReservationReq) => {
    await axios.post('/consults/reserve', data).then((response) => console.log(" 진료예약 완료: ",response.data)).catch((error) => console.log(error.response.data.message)) //메시지를 지정해 준 경우);
};
// 상담리스트를 가져오기
export const readConsultList = async (userId:number) => {
    await axios.get(`/consults/${userId}`).then(response => {
        console.log("상담리스트")
        return response.data;
    }).catch((error) => console.error(error));
};

// 상담디테일을 가져오기
export const readConsultDetail = async (counselingId:number) => {
    await axios.get(`/consults/list/${counselingId}`).then(response => {
        console.log("상담디테일");
        return response.data;
    }).catch((error) => console.error(error));
};

// 상담삭제하기
export const deleteConsult = async (reserveId:number) => {
    await axios.delete(`/consults/reserve/${reserveId}`).then(response => {
        console.log(".삭제가 완료됨"+response.data);
    }).catch((error) => console.error(error));
};
