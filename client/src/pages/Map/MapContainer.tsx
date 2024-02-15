import {useState} from "react";

const GoogleMap = () => {
    const [name, setName] = useState()
    const handleChange = (event:any) => {
        setName(event.target.value); // 입력 필드의 값으로 상태 업데이트
    };
    return (
        <div className={"flex flex-col"}>
            <div className={"mb-[5%]"}>
                <iframe
                    width="100%"
                    height="500px"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCR-wjxBq6af0t1lsyaVrI1Wt70n6eYx44&q=${name} 수유실&zoom=12`}
                />
            </div>
            <div>
                <input placeholder={"검색해주세요"} value={name} onChange={handleChange} className={"shadow-custom-inner border-b-2 rounded-2xl p-4"}/>
            </div>
        </div>

    );
};

export default GoogleMap