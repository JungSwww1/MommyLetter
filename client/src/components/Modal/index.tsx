import React,{ReactNode} from 'react';
import  './index.css'
interface Props{
    children: ReactNode;
}
const BottomUpModal = ({children}:Props) => {

    return (
        <div className="w-[100%] h-[100%]">
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bottom-sheet max-w-none max-w-full h-[100%]">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {children}
                </div>
            </dialog>
        </div>
    );
};

export default BottomUpModal;


