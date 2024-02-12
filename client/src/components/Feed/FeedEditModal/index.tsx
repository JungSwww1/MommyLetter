import React, {ReactNode} from 'react';
import './index.css'

interface Props {
    children: ReactNode;
    writeButton: ReactNode | boolean;
    boardId:number;
}

const BottomUpModal = ({children, writeButton, boardId}: Props) => {
    const dialogId = `my_modal_${boardId + 10}`;
    return (
        <div className="w-[100%] h-[100%]">
            <dialog id={dialogId} className="modal">
                <div className="modal-box bottom-sheet max-w-none max-w-full h-[100%] scrollBar">
                    <div className="flex justify-between">
                        <form method="dialog" >
                            <button id="closeBtn" className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        </form>
                        {writeButton}
                    </div>
                    {children}
                </div>
            </dialog>
        </div>
    );
};


export default BottomUpModal;