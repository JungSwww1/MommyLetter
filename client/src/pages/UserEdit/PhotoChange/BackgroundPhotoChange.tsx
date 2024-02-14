import BottomUpModal from "@/pages/UserEdit/Modal";
import {useRef, useState} from "react";
import {Toast} from "@/components/Toast/Toast";
import {Label} from "@/components/Feed/FeedWriteModal/styles";
import {ReactComponent as CircleX} from "@/assets/icons/circleX.svg";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {backgroundPhotoChangeAPI} from "@/apis/profile/ProfileAPI";

const ProfilePhotoChange = () => {
    const userId = Number(MommyLetterWS.getInstance().getUserInfo().userId)
    const [imgFiles, setImgFiles] = useState<File[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);

    const saveImgFiles = async (e: any) => {
        const files: FileList = e.target.files;
        Array.from(files).forEach(async (file: File) => {
            const err = checkImage(file);
            if (err) {
                console.log(err);
                return;
            }
            await setPreviews(prevFiles => [...prevFiles, URL.createObjectURL(file)]);
            await setImgFiles(imgFiles => [...imgFiles, file]);
        });
    };

    const checkImage = (file: File) => {
        let err = "";
        if (!file) return err = "File does not exist.";
        if (file.size > 1024 * 1024) err = "The largest image size is 1mb.";
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') err = "Image format is incorrect.";
        imgFiles.forEach((imgFile) => {
            if (file === imgFile) err = "File does already exist";
        });
        return err;
    };

    const profileChange = async () => {
        const formData = new FormData();
        imgFiles.forEach(file => formData.append('backgroundImage', file))

        backgroundPhotoChangeAPI(userId,formData).then(response => {
            Toast.success("작성되었습니다.");
            setImgFiles([]);
            setTimeout(() => document.getElementById("closeBtn")?.click(), 800);
        }).catch(error => console.log(error));
        await window.location.reload()
    };

    const fileChange = (index: number) => {
        const tempImages = imgFiles.filter((_, i) => i !== index);
        const tempPreviews = previews.filter((_, i) => i !== index);
        setImgFiles(tempImages);
        setPreviews(tempPreviews);
    };

    const writeButton = <button className="btn btn-ghost bg-user hover:bg-MenuColor hover:text-white" onClick={profileChange}>작성하기</button>

    return (
        <div>
            <BottomUpModal writeButton={writeButton} modalId={10}>
                <div>
                    <div className="flex justify-between">
                        <Label htmlFor="input-file">업로드</Label><p className="text-gray-400">※ 10MB 이하 png,jpg,jpeg파일</p>
                        <input type="file" id="input-file"
                               className="signup-profileImg-input"
                               onChange={saveImgFiles}
                               ref={imgRef}
                               multiple
                               style={{display: "none"}}/>
                    </div>
                    <div className="flex">
                        {previews?.map((preview, index) => (<div key={index} className="mr-2">
                            <button className="relative top-1/4 ml-1 hover:bg-gray-400 hover:rounded-lg active:scale-90"
                                    onClick={() => {
                                        fileChange(index)
                                    }}>
                                <CircleX/>
                            </button>
                            <img src={preview} className="w-[150px] aspect-[1]"/>
                        </div>))}
                    </div>

                </div>
            </BottomUpModal>
        </div>
    )
}

export default ProfilePhotoChange