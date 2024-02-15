// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";
// axios 객체 생성
const axios = LocalAxios();
const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
};

export const readDoctorList = async () => {
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
export const readDoctorDetail = async (doctorId:number) => {
    try{
        const res = await axios.get(`/profiles/doctors/${doctorId}`)
        return res.data;
    }catch(err:any){
        console.log('Register err : ', err.response);
        const statusCode = err.response.status; // 400
        const statusText = err.response.statusText; // Bad Request
        const message = err.response.data.message[0]; // id should not be empty
        console.log(`${statusCode} - ${statusText} - ${message}`);
    }
}
export const readDoctorDetailuser = async (userId:number) => {
    try{
        const res = await axios.get(`/profiles/doctors/user/${userId}`)
        return res.data;
    }catch(err:any){
        console.log('Register err : ', err.response);
        const statusCode = err.response.status; // 400
        const statusText = err.response.statusText; // Bad Request
        const message = err.response.data.message[0]; // id should not be empty
        console.log(`${statusCode} - ${statusText} - ${message}`);
    }
}
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

// 프로필 사진 바꾸기
export const profilePhotoChangeAPI = async (userId:number,data:FormData) => {
    try {
        const response = await axios.post(`/profiles/profileImage/${userId}`, data, config)
    } catch (error) {
        handleApiError('프로필 사진을 바꾸는 중 오류 발생 : ', error)
    }
}

// 배경사진 바꾸기
export const backgroundPhotoChangeAPI = async (userId:number,data:FormData) => {
    try {
        const response = await axios.post(`/profiles/backgroundImage/${userId}`,data,config)
    } catch (error) {
        handleApiError('배경 사진을 바꾸는 중 오류 발생 : ', error)
    }
}


const handleApiError = (message:any, error:any) => {
    console.error(`${message}:`, error);
    throw new Error(message);
};