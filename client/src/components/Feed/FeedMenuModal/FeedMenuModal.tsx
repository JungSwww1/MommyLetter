import React, {useEffect, useRef, useState} from 'react';
import "@/components/Feed/FeedMenuModal/Modal.css"
interface MenuProps {
    onEdit: () => void;    // 아무것도 받지 않고 반환도 없는 함수 타입
    onDelete: () => void;
    onClose: () => void;
}
const Menu:React.FC<MenuProps> = ({ onEdit, onDelete, onClose  }) => {
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShowModal(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose(); // 메뉴 바깥 부분을 클릭하면 onClose 함수 호출
            }
        };
        // 클릭 이벤트 리스너 등록
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 클릭 이벤트 리스너 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={menuRef} className="flex flex-row absolute shadow-md rounded" onClick={(e) => e.stopPropagation()}>
            <button className="btn cursor-pointer bg-MenuColor hover:bg-yellow-300 text-white hover:text-MenuColor" onClick={onEdit}>수정</button>
            <button className="btn cursor-pointer bg-MenuColor hover:bg-yellow-300 text-white hover:text-MenuColor" onClick={onDelete}>삭제</button>
        </div>
    );
};

export default Menu;
