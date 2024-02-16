import React, { useState } from 'react';
import Map from './Map';

function Kakao() {
    const [searchPlace, setSearchPlace] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // 검색 로직 추가, 예를 들어 setSearchPlace를 사용
    };

    return (
        <div>
            <div className={"flex justify-center mt-[5%] text-[150%]"}>
                <p>수유실</p>
            </div>
            <form onSubmit={handleSearch} className={"flex justify-center mb-[5%] mt-[5%]"}>
                <input
                    type="search"
                    value={searchPlace}
                    onChange={(e) => setSearchPlace(e.target.value)}
                    placeholder="검색할 지역을 입력하세요"
                    className={"shadow-custom-inner border-b-2 p-3 rounded-2xl w-[80%]"}
                />
                {/*<button type="submit">검색</button>*/}
            </form>
            <div>
                <Map searchPlace={searchPlace} />
            </div>
        </div>
    );
}

export default Kakao;
