import React, { useState } from "react";
import BottomUpModal from "@/pages/UserEdit/Modal";
import { Input } from "@/pages/UserEdit/PasswordChange/styles";
import { deleteUserAPI } from "@/apis/Auth/authAPI";
import { loginAPI } from "@/apis/Auth/authAPI";
import { Toast } from "@/components/Toast/Toast";
import { useNavigate } from "react-router-dom";

interface deleteProps {
    userId: number;
}

const UserDelete: React.FC<deleteProps> = ({ userId }) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(""); // 비밀번호 상태 관리

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const deleteUser = async () => {
        const authData = JSON.parse(localStorage.getItem("Auth") || '{}');
        const email = authData.email; // email 추출
        const data = {email:email, password: password}

        const loginResponse = await loginAPI(data)
        if (loginResponse) {
            await deleteUserAPI(userId).then(response => {
                alert("회원 탈퇴되었습니다.");
                setTimeout(() => document.getElementById("closeBtn")?.click(), 800);
                localStorage.clear();
                navigate("/login");
            }).catch(error => console.log(error));
        } else {
            alert("비밀번호가 올바르지 않습니다.");
        }
    };

    const writeButton = <button className="btn btn-ghost bg-user hover:bg-MenuColor hover:text-white" onClick={deleteUser}>탈퇴하기</button>;

    return (
        <div>
            <BottomUpModal writeButton={writeButton} modalId={2}>
                <div className={"flex justify-center mt-[5%] mb-[5%]"}>
                    <p className={"font-bold text-red-700"}>정말 탈퇴하시겠습니까?</p>
                </div>
                <div className={"flex justify-center"}>
                    <Input type="password" placeholder={"비밀번호를 입력해주세요."} value={password} onChange={handlePasswordChange}/>
                </div>
            </BottomUpModal>
        </div>
    );
};

export default UserDelete;
