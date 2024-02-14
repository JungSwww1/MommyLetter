import {useEffect, useState} from 'react';
import '../../../components/SwitchButton/ToggleSwitch.css';
import {BasicInput, Button, Layout, Submit, Title, Wrapper, Wrapper2} from "@/pages/Consult/ConsultRegist/styles";
import {readPatientDetail} from "@/apis/Doctor/DoctorAPI";
import {useNavigate, useParams} from "react-router-dom";
import {PatientDetailRes} from "@/apis/type/types";
import Diary from "@/assets/icons/diary";
import {fetchDMList, startDM} from "@/apis/DM/DMAPI";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {UserProps} from "@/pages/type/types";

interface DMProps {
    userId: number;
    chatGroupId: number;
}

const ReserveDetailPage = () => {
    // 토글 슬라이드 버튼(이건 슬라이드 버튼용)
    const [isToggled, setToggled] = useState(false);
    const [patient, setPatient] = useState<PatientDetailRes>()
    const [myDMList, setMyDMList] = useState<DMProps[]>([])
    const [user, setUser] = useState<UserProps>()
    const userInstance: UserProps = MommyLetterWS.getInstance().getUserInfo()
    const navigate = useNavigate();
    const param = Number(useParams()["reserveId"]);
    console.log(patient)
    useEffect(() => {
        setUser(userInstance);
    }, []);
    useEffect(() => {
        if (!param) return;
        readPatientDetail(param).then((response) => {
            setPatient(response);

        })

    }, [param]);
    useEffect(() => {
        if (!patient) return;
        setToggled(patient.diaryOpen);
        setSelectedOption(patient.status);
    }, [patient]);
    useEffect(() => {
        if (!user) return;
        fetchDMList(Number(user.userId)).then((response) => {
            response.map((dm: any) => {
                const dmList: DMProps[] = response.map((dm: any) => ({
                    chatGroupId: Number(dm.chatGroupId),
                    userId: Number(user.userId) == Number(dm.chatRoomName.split("_")[2]) ? Number(dm.chatRoomName.split("_")[1]) : Number(dm.chatRoomName.split("_")[2])
                }));
                setMyDMList(dmList);
            });
        })
    }, [user]);
    const [selectedOption, setSelectedOption] = useState('');
    const goDm = async (otherUserId: number) => {
        if (!user || !user.userId) return;
        const isUsed = myDMList.find((tempUser: DMProps) => tempUser.userId === otherUserId)
        if (isUsed) return navigate(`/message/${isUsed.chatGroupId}`);
        await startDM(Number(user.userId), otherUserId)
            .then(response => {
                setMyDMList(prevState => [...prevState, response, otherUserId])
                navigate(`/message/${response}`);
            });

    }

    const goDiary = () => {
        console.log("sd");
        navigate(`/${patient?.userId}/diary/mom`);
    }

    const writeAction = () => {
        navigate(`/reserve/${param}/write`)
    }

    return (<div>
            {/* 메인 내용 */}
            <Layout>

                <Title>이름</Title>
                <BasicInput value={patient?.name} disabled/>

                <Title>주민등록번호</Title>
                <Wrapper>
                    <BasicInput value={patient?.ssn} disabled/>
                </Wrapper>

                <Title>전화번호</Title>
                <BasicInput
                    maxLength={11}
                    value={patient?.phone} disabled/>

                <Title>임신 / 출산 여부</Title>
                <Wrapper>
                    <Button
                        className={`${selectedOption === 'Pregnant' ? 'bg-[#533C00] text-white' : 'bg-[#FFDF6D] text-black'}`}>임신</Button>
                    <Button
                        className={`${selectedOption === 'Mother' ? 'bg-[#533C00] text-white' : 'bg-[#FFDF6D] text-black'}`}>출산</Button>
                    <Button
                        className={`${selectedOption === 'None' ? 'bg-[#533C00] text-white' : 'bg-[#FFDF6D] text-black'}`}>해당없음</Button>
                </Wrapper>

                <Title>비고</Title>
                <BasicInput value={patient?.extra} disabled
                />

                <Title>산모일기 제공 여부</Title>
                <Wrapper2>
                    <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`}>
                        <div className="slider"></div>

                    </div>
                    <p className={`ml-[3%] ${isToggled ? '' : 'text-red-500'}`}>{isToggled ? '제공' : '비제공'}</p>

                </Wrapper2>
                <div className="flex justify-around">
                    {patient && <Submit onClick={() => goDm(patient?.userId)}>연결</Submit>}
                    {patient?.diaryOpen &&
                        <button onClick={goDiary} className="btn rounded-full bg-user"><Diary fill={"black"}/>일기 확인
                        </button>}
                    <Submit className="btn btn-primary" onClick={writeAction}>결과작성</Submit>

                </div>




            </Layout>

        </div>)
}

export default ReserveDetailPage;