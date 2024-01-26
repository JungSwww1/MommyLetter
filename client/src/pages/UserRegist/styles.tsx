import styled from "tailwind-styled-components";

export const Layout = styled.div`
    ml-[4%]
    mr-[4%]
    mb-[6%]
`

export const Container = styled.div`
    mb-[6%]
`

export const RegistContainer = styled.div`
    flex 
    justify-center
    mt-[10%]
`
export const EmailWrapper = styled.div`
    flex 
    justify-around
    items-center 
    mb-[3%]
`

export const EmailInput = styled.input`
    w-[450%]
    bg-white
    shadow-inner
    md:shadow md:w-[45%] md:h-9 md:rounded-2xl
    pl-[4%]
    text-[90%]
`

export const DefaultInput = styled.input`
    bg-white 
    shadow-inner 
    md:shadow md:w-[100%] md:h-9 md:rounded-2xl
    pl-[4%]
    mb-[3%]
    text-[90%]
`

export const CheckButton = styled.button`
    w-[27%]
    h-[36px] 
    bg-yellow-400 
    shadow-md 
    rounded-[18px]
    text-[80%]
    text-[#533C00]
    font-bold
`

export const RegisterButton = styled.button`
    w-[27%]
    h-[36px]
    bg-[#533C00]
    shadow-md
    rounded-[18px]
    text-[90%]
    text-white
`

export const Title = styled.p`
    text-[15px]
    font-bold
    text-[#533C00]
    mb-[2%]
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