import axios from "axios";

const LocalAxios = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    return instance;
};

export default LocalAxios;