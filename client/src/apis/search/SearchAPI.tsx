// LocalAxios 모듈
import LocalAxios from "@/util/localAxios";
import {DiaryUpdateRequestProps, DiaryWriteRequestProps} from "@/apis/type/types";
import {useEffect, useState} from "react";


// axios 객체 생성
const axios = LocalAxios();

// 유사 닉네임들을 가져오는 함수
export const fetchNickname = (data:string) => {
    return axios.get(`/search/nickname?nickname=${data}`).then(response => {
        return response.data;
    }).catch((error) => console.error(error));
};


// 유사 해시태그들을 가져오는 함수
export const fetchHashtag = (data:string) => {
    return axios.get(`/search/hashtags?content=${data}`).then(response => {
        return response.data;
    }).catch((error) => console.error(error));
};
