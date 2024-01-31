import axios from "axios";

// local vue api axios instance

const LocalAxios = () => {
    const instance = axios.create({
        baseURL: process.env.BACKEND_BASE_URL,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    return instance;
};

export default LocalAxios;