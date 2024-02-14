import React, { useState } from 'react';
import BottomUpModal from "@/pages/UserEdit/Modal/index";
import {Input} from "@/pages/UserEdit/PasswordChange/styles";
import {pwdChangeAPI} from "@/apis/Auth/authAPI";
import {Toast} from "@/components/Toast/Toast";

interface PasswordChangeProps {
    userId: number;
    nickname: string;
    intro: string;
}
const PasswordChange:React.FC<PasswordChangeProps>  = ({userId, nickname, intro}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 현재 비밀번호
    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    };
    // 새로운 비밀번호
    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(e.target.value);
    };

    const passwordChange = async () => {
        if(newPassword !== confirmNewPassword) {
            setPasswordError('새로운 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPassword === "" || confirmNewPassword === "") {
            setPasswordError("비밀번호를 입력하세요");
            return;
        }
        const pwData = {userId, nickname, intro, currentPassword, newPassword}
        await pwdChangeAPI(userId, pwData).then(response => {
            Toast.success("수정되었습니다.");
            setNewPassword("");
            setConfirmNewPassword("");
            setTimeout(() => document.getElementById("closeBtn")?.click(), 800);
        }).catch(error => console.log(error));

        // 비밀번호 변경 API 호출 후 결과 처리 로직 추가
    }

    const writeButton = <button className="btn btn-ghost bg-user hover:bg-MenuColor hover:text-white" onClick={passwordChange}>수정하기</button>;
    return (
        <div>
            <BottomUpModal writeButton={writeButton} modalId={1}>
                <div className={"flex flex-col mt-[5%]"}>
                    <Input type="password" placeholder={"기존 비밀번호를 입력해주세요."} value={currentPassword} onChange={handleCurrentPasswordChange}/>
                    <Input type="password" placeholder={"새로운 비밀번호를 입력해주세요."} value={newPassword} onChange={handleNewPasswordChange}/>
                    <Input type="password" placeholder={"새로운 비밀번호를 다시 입력해주세요."} value={confirmNewPassword} onChange={handleConfirmNewPasswordChange}/>
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
            </BottomUpModal>
        </div>
    );
}

export default PasswordChange;
