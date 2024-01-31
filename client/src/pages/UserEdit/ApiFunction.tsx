import { useEffect, useState } from "react";
import { getUserData, updateUser } from "@/apis/User/userApi";

export const localFunction = () => {
    const [incomeData, setIncomeData] = useState({
        localNickname: "",
        localIntro: "",
    });

    const editIncomeData = (data:any) => {
        setIncomeData(data);
    }
    const screenData = async () => {
        try {
            const userData = await getUserData(101);
            setIncomeData({
                localNickname: userData.nickname,
                localIntro: userData.intro,
            });
            console.log("응답 데이터:", userData);
        } catch (error) {
        }
    };

    const edit = async () => {
        try {
            await updateUser(101, incomeData);
            console.log("전송 완료");
        } catch (error) {
        }
    };

    return {
        incomeData,
        editIncomeData,
        screenData,
        edit,
    };
};
