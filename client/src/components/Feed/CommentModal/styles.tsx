import styled from "tailwind-styled-components";
import './Modal.css';

export const CommentContainer = styled.div`
    mt-[4%]
    mb-[4%] 
    ml-[2%]    
`

export const MainContainer = styled.div`
    flex flex-row 
    mb-[3%] 
    items-center
`

export const SubContainer = styled.div`
    flex flex-row 
    text-[65%] 
    justify-between
`

export const SubWrapper = styled.div`
    flex flex-row
    w-[40%] 
`
export const SubDiv = styled.div`
    flex flex-row
    ml-[3%] w-[50%] 
`

export const InputContainer = styled.div`
    flex 
    modal-input-container 
    items-center
    justify-center
`

export const Submit = styled.button`
    modal-submit-btn 
    btn 
    bg-[#FFDF6D] hover:bg-blue-500
`