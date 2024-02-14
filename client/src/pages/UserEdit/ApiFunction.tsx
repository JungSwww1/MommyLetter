import { useEffect, useState } from "react";
import { getUserData, updateUser, nicknameCheck } from "@/apis/User/userApi";
import {getProfileAPI} from "@/apis/profile/ProfileAPI";

export const localFunction = (localUserId:number) => {

    // 아래는 닉네임 중복 용도 -> 안되면 수정 안된다.
    const [nicknameStatus, setNicknameStatus] = useState<"available" | "unavailable" | "checking">("checking");
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    // 가져온 데이터 담는 용도
    const [incomeData, setIncomeData] = useState({
        localNickname: "",
        localIntro: "",
    });

    // 수정된 데이터 용도
    const [editedData, setEditedData] = useState({
        nickname: "",
        intro: "",
    })
    const editEditedData = (data:any) => {
        setEditedData(data);
    }

    // 닉네임, 소개 데이터 가져오기 용도
    const screenData = async (screenId:number) => {
        try {
            if (screenId) {
                const userData = await getProfileAPI(screenId);
                setIncomeData({
                    localNickname: userData.nickname,
                    localIntro: userData.intro,
                });
                setEditedData({
                    nickname: userData.nickname,
                    intro: userData.intro,
                });
                console.log("응답 데이터:", userData);
            }

        } catch (error) {
        }
    };

    // 수정버튼 눌렀을 떄 작동
    const edit = async () => {
        try {
            if(isNicknameChecked) {
                const isNicknameAvailable = await checkNickname();
                if (isNicknameAvailable && nicknameStatus=="available") {
                    await updateUser(localUserId, editedData);
                    alert("수정되었습니다.")
                    setIsNicknameChecked(false);
                } else {
                    alert("닉네임 중복을 다시 확인해주세요.")
                    setIsNicknameChecked(false);
                }
            } else {
                alert("닉네임 중복 버튼을 눌러주세요.")
            }

        } catch (error) {
            console.error("edit 실행 중 오류 발생:", error);
        }
    };

    // 닉네임 중복 체크
    const checkNickname = async () => {
        try {
            setNicknameStatus("checking");
            console.log("check",editedData.nickname)
            const isAvailable = await nicknameCheck(editedData.nickname)
            setNicknameStatus(isAvailable ? "available" : "unavailable");
            if (isAvailable) {
                setIsNicknameChecked(true);
                return true; // 닉네임 사용 가능하면 true 반환
            } else {
                setIsNicknameChecked(true);
                return false; // 중복된 경우 false 반환
                alert("닉네임이 중복되었습니다. 다른 닉네임을 사용해주세요.");

            }
            console.log("checkNickname : 닉네임 중복 확인 완료")
        } catch (error) {
            console.error(`checkNickname 실행 중 오류 발생: ${error}`);
            return false;
        }
    }


    return {
        nicknameStatus,
        incomeData,
        editedData,
        screenData,
        editEditedData,
        checkNickname,
        edit,
    };
};
