import {getUserData} from "@/apis/User/userApi";
import {sendBoardLikeAPI} from "@/apis/Board/boardApi";

export const localFunction = () => {
    const getNickname = async(userId:number): Promise<string | null> => {
        try {
            const userData = await getUserData(userId);
            return userData.nickname;
        } catch (error) {
            console.error("사용자 데이터를 가져오는 중 에러 발생:", error);
            return null;
        }
    }

    const sendBoardLike = async(userId:number, boardId:number) => {
        const Data = {userId:userId, boardId:boardId}
        try {
            const res = await sendBoardLikeAPI(Data)
        } catch (error) {
        }
    }


    return {
        getNickname,
        sendBoardLike
    }

}