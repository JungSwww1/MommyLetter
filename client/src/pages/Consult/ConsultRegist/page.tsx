import { useState } from 'react';
import '../../../components/SwitchButton/ToggleSwitch.css';
import {BasicInput, Button, Layout, NumberInput, Submit, Title, Wrapper, Wrapper2} from "@/pages/Consult/ConsultRegist/styles";

// 밑 내용은 수정해야한다.
const ConsultRegist = () => {
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

    return (
        <div>
            {/* 메인 내용 */}
            <Layout>
                <Title>이름</Title>
                <BasicInput placeholder={"이름을 입력해주세요"}/>

                <Title>주민등록번호</Title>
                <Wrapper>
                    <NumberInput placeholder={"주민등록번호 앞자리"}/>
                    <p>-</p>
                    <NumberInput placeholder={"주민등록번호 뒷자리"}/>
                </Wrapper>

                <Title>전화번호</Title>
                <BasicInput placeholder="010XXXXYYYY 형식으로 입력해주세요."/>

                <Title>임신 / 출산 여부</Title>
                <Wrapper>
                    <Button>임신</Button>
                    <Button>출산</Button>
                    <Button>해당없음</Button>
                </Wrapper>

                <Title>비고</Title>
                <BasicInput/>

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
                <Submit>제출</Submit>
            </Layout>

        </div>
    )
}

export default ConsultRegist;