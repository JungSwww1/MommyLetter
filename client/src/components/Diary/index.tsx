import {DiaryLayout} from "@/pages/Diary/DiaryWrite/styles";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const DiaryHeader = () => {
    const param = useParams()["*"];
    useEffect(() => {

    }, [param]);
    console.log(param);
    const [isToggled, setToggled] = useState(false);
    const navigate = useNavigate();
    const handleToggle = () => {
        setToggled(!isToggled);
        isToggled ? navigate("/diary/mom") : navigate("/diary/baby")
    };

    return (<DiaryLayout>
        <span className="font-bold text-xl">{isToggled ? "육아일기" : "산모일기"}</span>
        {/* On Off 버튼 */}
        <label className="swap">
            <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                <div className="slider"></div>
            </div>
        </label>
    </DiaryLayout>);
}

export default DiaryHeader;