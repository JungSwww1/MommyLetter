// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";
// axios 객체 생성
const axios = LocalAxios();

export const ReadDoctorList = async () => {
    try {
        const res = await axios.get('/profiles/doctors')
        return res.data;
    } catch (err: any) {
        console.log('Register err : ', err.response);
        const statusCode = err.response.status; // 400
        const statusText = err.response.statusText; // Bad Request
        const message = err.response.data.message[0]; // id should not be empty
        console.log(`${statusCode} - ${statusText} - ${message}`);

    }
};

// 프로필 관련 정보 가져오기
export const getProfileAPI = async (userId:number) => {
    try {
        const res = await axios.get(`/profiles/${userId}`)
        return res.data;
    } catch (err:any) {
        console.log('Register err : ', err.response);
        const statusCode = err.response.status; // 400
        const statusText = err.response.statusText; // Bad Request
        const message = err.response.data.message[0]; // id should not be empty
        console.log(`${statusCode} - ${statusText} - ${message}`);
    }
}