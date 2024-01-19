import styled from "tailwind-styled-components";

export const BackgroundImg = styled.img`
    w-[850px] 
    h-[280px] 
    absolute left-[0px] 
             top-[0px] 
    rounded-bl-[15px] 
    rounded-br-[15px]
`

export const Profile = styled.div`
    w-[850px] relative left-[25%] top-[-25px]
`

export const ProfileImg = styled.img`
    w-[200px] h-[200px] absolute left-[115px] top-[165px] rounded-full bg-amber-50
`
export const Text = styled.p`
    absolute
    text-[15px] 
    font-bold 
    text-left 
    text-black
`
export const ProfileButton = styled.button`
    w-[188px] h-[27px] absolute  rounded-[5px] bg-[#d9d9d9] text-[13px]
`
export const BottomNav = styled.nav`
    fixed bottom-0 w-[850px] h-45 bg-gray-300 border-t-2 border-gray-500
`