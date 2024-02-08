import React, { ReactNode} from 'react';

interface Props {
    children: ReactNode;
    onConfirm: () => void;
}

const AlertModal = ({ children, onConfirm  }: Props) => {
    return (
        <div>
            <dialog open={false} id="my_modal_1" className="modal">
                <div className="w-[25%] modal-box">
                    {children}
                    <div className="modal-action">
                        <form method="dialog">
                            <button id="closeBtn" className="btn" onClick={onConfirm}>확인</button>
                            <button id="closeBtn" className="btn ml-[10px]">취소</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AlertModal;
