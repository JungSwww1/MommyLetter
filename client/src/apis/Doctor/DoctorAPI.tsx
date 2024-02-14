// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";
import {ReservationReq} from "@/apis/type/types";


// axios 객체 생성
const axios = LocalAxios();

// Diary 인터페이스 정의

const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
};
// 처방전 작성
export const createPrescription = async (data: FormData) => {
    await axios.post('/doctors', data, config).then((response) => console.log("처방전 작성: ", response.data)).catch((error) => console.log(error.response.data.message)) //메시지를 지정해 준 경우);
};
// 환자리스트 조회
export const readPatientList = async (doctorId:number) => {
    try {
        const response = await axios.get(`/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//환자 디테일

export const readPatientDetail = async (reserveId:number) => {
    try {
        const response = await axios.get(`/doctors/patient/${reserveId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// 진료 예약
export const createReservation = async (data: ReservationReq) => {
    await axios.post('/consults/reserve', data).then((response) => console.log(" 진료예약 완료: ",response.data)).catch((error) => console.log(error.response.data.message)) //메시지를 지정해 준 경우);
};
