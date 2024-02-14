import React, {ReactNode} from 'react';
import './index.css'

interface Props {
    children: ReactNode;
    writeButton: ReactNode | boolean;
    modalId : number;
}

const BottomUpModal = ({children, writeButton, modalId}: Props) => {

    return (
        <div className="w-[100%] h-[100%]">
            <dialog id={`my_modal_${modalId}`} className="modal">
                <div className="modal-box bottom-sheet2 max-w-none max-w-full h-[100%] scrollBar">
                    <div className="flex justify-between">
                        <form method="dialog" >
                            <button id="closeBtn" className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        </form>
                        {writeButton}
                    </div>
                    {children}
                </div>
            </dialog>
        </div>);
};

export default BottomUpModal;