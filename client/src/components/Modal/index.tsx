import React,{ReactNode} from 'react';
import  './index.css'
interface Props{
    children: ReactNode;
    writeButton: ReactNode|boolean
}
const BottomUpModal = ({children,writeButton}:Props) => {
<<<<<<< PATCH SET (1c6e68 Merge branch 'feat_seokju_diaryAPI' into frontend)

=======
>>>>>>> BASE      (e4e540 ✨Feat: Comment Modal and designs)
    return (
        <div className="w-[100%] h-[100%]">
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bottom-sheet max-w-none max-w-full h-[100%] scrollBar">
                    <form method="dialog" className="flex justify-between">
                        <button className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        {writeButton}
                    </form>
                    {children}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

<<<<<<< PATCH SET (1c6e68 Merge branch 'feat_seokju_diaryAPI' into frontend)
export default BottomUpModal;


=======
export default BottomUpModal;
>>>>>>> BASE      (e4e540 ✨Feat: Comment Modal and designs)
