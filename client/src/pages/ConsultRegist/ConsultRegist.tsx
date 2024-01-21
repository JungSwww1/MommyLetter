import { useState } from 'react';
import './ToggleSwitch.css';
const ConsultRegist = () => {
    const [isToggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(!isToggled);
    };
    
    const [isToggled1, setToggled1] = useState(false);

    // 토글 버튼 클릭 핸들러
    const handleToggle1 = () => {
    setToggled1(!isToggled1);
    };

    return (
        <div>
            {/* 아래는 헤더부분 */}
            <nav className="fixed top-0">This is Header</nav>
            <div className="relative top-[200px]">
                <p>이름</p>
                <input />
                <p>주민등록번호</p>
                <div className="flex justify-around">
                    <input />
                    <p>-</p>
                    <input />
                </div>
                <p>전화번호</p>
                <input />
                <p>임신 / 출산 여부</p>
                <div className="flex justify-around">
                    <button>임신</button>
                    <button>출산</button>
                    <button>해당없음</button>
                </div>
                <p>비고</p>
                <input/>
                <p>산모일기 제공 여부</p>
                <div className="flex">
                    <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                    <div className="slider"></div>
                    </div>
                    <p>제공</p>
                </div>
                <div className="flex">
                    <label>
                        <input type="checkbox" checked={isToggled1} onChange={handleToggle1} />
                        {isToggled1 ? '켜짐' : '꺼짐'}
                    </label>
                    <p>개인정보 약관 동의</p>
                </div>
            </div>
            <div className="relative top-[1000px]">Test</div>
        </div>
    )
}

export default ConsultRegist;