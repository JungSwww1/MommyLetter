import styled from "tailwind-styled-components";

export const Layout = styled.div`
    ml-[4%]
    mr-[4%]
    mb-[6%]
`

export const Container = styled.div`
    flex flex-col
    mb-[6%]
`

export const RegistContainer = styled.div`
    flex 
    justify-center
    mt-[3%]
`
export const EmailWrapper = styled.div`
    flex 
    justify-around
    items-center 
    mb-[3%]
`

export const EmailInput = styled.input`
    w-[45%]
    bg-white
    shadow-custom-inner
    border-b-2
    p-2
    pl-[4%]
    text-[90%]
    rounded-xl
`

export const DefaultInput = styled.input`
    bg-white
    shadow-custom-inner
    border-b-2
    p-2
    pl-[4%]
    mb-[3%]
    w-[60%]
    text-[90%]
    rounded-xl
`

export const CheckButton = styled.button`
    btn
    w-[18%]
    h-[10px] 
    bg-yellow-400 
    shadow-custom-outer
    rounded-[18px]
    border-user
    text-[80%]
    text-[#533C00]
    hover:bg-MenuColor
    hover:text-white
    font-bold
`

export const RegisterButton = styled.button`
    btn
    w-[27%]
    h-[36px]
    bg-[#533C00]
    rounded-[18px]
    text-[90%]
    text-white
    border-MenuColor
    shadow-custom-outer
    hover:bg-user
    hover:text-MenuColor
`

export const Title = styled.p`
    text-[15px]
    font-bold
    text-[#533C00]
    mb-[3%]
`
export const MainTitle = styled.p`
    text-[20px] 
    text-[#533C00] 
    mt-[5%] 
    mb-[8%] 
    font-bold
`

export const PasswordBlank = styled.div`
    invisible
`