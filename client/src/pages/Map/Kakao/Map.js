import React, { useEffect, useState, useRef } from 'react';

const Map = ({ searchPlace }) => {
    const [places, setPlaces] = useState([]);
    const [pagination, setPagination] = useState();
    const mapRef = useRef(null); // 지도 객체를 저장하기 위한 ref
    const markerRef = useRef(null); // 마커 객체를 저장하기 위한 ref

    useEffect(() => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('suyusil');
            const options = {
                center: new window.kakao.maps.LatLng(37.503325, 127.044034),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            mapRef.current = map; // 지도 객체를 ref에 저장

            const ps = new window.kakao.maps.services.Places();

            ps.keywordSearch('CU 편의점 ' + searchPlace, (data, status, pagi) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setPlaces(data);
                    setPagination(pagi);
                }
            });
        });
    }, [searchPlace]);

    const handlePageChange = (page) => {
        pagination.gotoPage(page);
    };

    const moveToLocation = (latitude, longitude) => {
        const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
        mapRef.current.setCenter(moveLatLon);

        // 이전 마커가 있으면 제거
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }

        // 새 위치에 마커 생성
        const marker = new window.kakao.maps.Marker({
            position: moveLatLon,
            map: mapRef.current,
        });

        markerRef.current = marker; // 생성된 마커를 ref에 저장
    };

    return (
        <div id="map-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div id="suyusil" style={{ width: '100%', height: '350px' }}></div>
            <div>
                {places.map((place, index) => (
                    <div key={index}  className={"p-2 border-2 border-black rounded-lg"} style={{ marginTop: '10px' }} onClick={() => moveToLocation(place.y, place.x)}>
                        <div>{place.place_name}</div>
                        <div>{place.address_name}</div>
                        <div>{place.phone}</div>
                    </div>
                ))}
            </div>
            {pagination && (
                <div style={{ marginTop: '20px' }}>
                    {Array(pagination.last).fill().map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i)} style={{ marginRight: '5px' }}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Map;
