import {useEffect, useState} from 'react';
import '../../../components/SwitchButton/ToggleSwitch.css';
import {BasicInput, Button, Layout, NumberInput, Submit, Title, Wrapper, Wrapper2} from "@/pages/Consult/ConsultRegist/styles";
import {addConsultInfoAPI} from "@/apis/Auth/authAPI";

// 밑 내용은 수정해야한다.
const ConsultRegist = () => {
    const getAuthUserId = () => {
        const authData = localStorage.getItem('Auth');
        if (authData) {
            const authObject = JSON.parse(authData);
            return authObject.userId;
        }
        return 0;
    };
    const [authUserId, setAuthUserId] = useState<number>(getAuthUserId());
    const [consultName, setConsultName] = useState('')
    const [phone, setPhone] = useState(''); // 전화번호 상태
    const [extra, setExtra] = useState(''); // 비고란
    const [ssnFront, setSsnFront] = useState(''); // 주민등록번호 앞자리
    const [ssnBack, setSsnBack] = useState(''); //주민등록번호 뒷자리
    // 토글 슬라이드 버튼(이건 슬라이드 버튼용)
    const [isToggled, setToggled] = useState(false);
    const handleToggle = () => {
        setToggled(!isToggled);
    };
    
    // 토글 버튼 클릭 핸들러 (이건 체크박스용)
    const [isToggled1, setToggled1] = useState(false);
    const handleToggle1 = () => {
        setToggled1(!isToggled1);
    };

    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionClick = (option:string) => {
        setSelectedOption(option);
    };

    const submitConsult = () => {
        // 입력 필드 및 선택 필드 검증
        if (!consultName || !phone || !ssnFront || !ssnBack || !selectedOption || !isToggled || !isToggled1) {
            let errorMessage = "다음 필드를 확인해주세요:\n";
            if (!consultName) errorMessage += "- 이름\n";
            if (!phone) errorMessage += "- 전화번호\n";
            if (!ssnFront || !ssnBack) errorMessage += "- 주민등록번호\n";
            if (!selectedOption) errorMessage += "- 임신/출산 여부\n";
            if (!isToggled) errorMessage += "- 산모일기 제공 여부\n";
            if (!isToggled1) errorMessage += "- 개인정보 약관 동의\n";

            alert(errorMessage);
            return; // 필수 필드가 비어있으므로 함수 실행 중지
        }

        const data = {
            phone: phone,
            pregnancyStatus: selectedOption,
            extra: extra,
            diaryOpen: isToggled
        };
        addConsultInfoAPI(authUserId, data);
        alert("상담 정보 등록을 완료했습니다.")
    }

    return (
        <div>
            {/* 메인 내용 */}
            <Layout>
                <Title>이름</Title>
                <BasicInput placeholder={"이름을 입력해주세요"}
                            value={consultName}
                            onChange={(e) => setConsultName(e.target.value)}
                />

                <Title>주민등록번호</Title>
                <Wrapper>
                    <NumberInput placeholder={"주민등록번호 앞자리"}
                                 maxLength={6}
                                 value={ssnFront}
                                 onChange={(e) => setSsnFront(e.target.value)}
                    />
                    <p>-</p>
                    <NumberInput type="password"
                                 placeholder={"주민등록번호 뒷자리"}
                                 maxLength={7}
                                 value={ssnBack}
                                 onChange={(e) => setSsnBack(e.target.value)}
                    />
                </Wrapper>

                <Title>전화번호</Title>
                <BasicInput placeholder="010XXXXYYYY 형식으로 숫자만 입력해주세요."
                            maxLength={11}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                />

                <Title>임신 / 출산 여부</Title>
                <Wrapper>
                    <Button className={`${
                        selectedOption === 'Pregnant' ? 'bg-[#533C00] text-white' : 'bg-[#FFDF6D] text-black'
                    }`} onClick={() => handleOptionClick('Pregnant')}>임신</Button>
                    <Button className={`${
                        selectedOption === 'Mother' ? 'bg-[#533C00] text-white' : 'bg-[#FFDF6D] text-black'
                    }`} onClick={() => handleOptionClick('Mother')}>출산</Button>
                    <Button className={`${
                        selectedOption === 'None' ? 'bg-[#533C00] text-white' : 'bg-[#FFDF6D] text-black'
                    }`} onClick={() => handleOptionClick('None')}>해당없음</Button>
                </Wrapper>

                <Title>비고</Title>
                <BasicInput value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                />

                <Title>산모일기 제공 여부</Title>
                <Wrapper2>
                    <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                    <div className="slider"></div>
                    </div>
                    <p className={`ml-[3%] ${isToggled ? '' : 'text-red-500'}`}>{isToggled ? '제공' : '비제공'}</p>
                </Wrapper2>

                <Wrapper2>
                    <label>
                        <input
                            type="checkbox"
                            checked={isToggled1}
                            onChange={handleToggle1}
                        />
                    </label>
                    <p className={"ml-[2%] text-blue-800"} >개인정보 약관 동의</p>
                </Wrapper2>
                <Submit onClick={submitConsult}>제출</Submit>
            </Layout>

        </div>
    )
}

export default ConsultRegist;