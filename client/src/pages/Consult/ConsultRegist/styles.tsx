import styled from "tailwind-styled-components";

export const Layout = styled.div`
    mt-[5%]
    mr-[10%]
    ml-[10%]
`

export const Wrapper = styled.div`
    flex 
    justify-around 
    mb-[5%]
`
export const Wrapper2 = styled.div`
    flex
    
    ml-[3%] mb-[5%]
`

export const Title = styled.p`
    font-bold
    ml-[3%]   
    mb-[3%]
`

export const BasicInput = styled.input`
    w-[94%]
    ml-[3%]
    mb-[5%]
    shadow-custom-inner
    text-[100%]
    rounded-xl
    border-b-2
    p-3
`

export const NumberInput = styled.input`
    w-[40%]
    shadow-custom-inner
    rounded-xl
    border-b-2
    p-3
`

export const Button = styled.button`
    shadow-custom-outer
    border-[#FFDF6D]
    btn
    cursor-pointer 
    text-[#533C00]
    bg-[#FFDF6D] 
    hover:bg-[#533C00]
    hover:text-white
    w-[25%]
    h-[40px]
    rounded-xl
    transition-colors duration-300
`

export const Submit = styled.button`
    shadow-custom-outer
    border-[#533C00]
    text-white
    btn
    w-[25%]
    h-[40px]
    ml-[3%] 
    mb-[5%]
    bg-[#533C00]
    rounded-full
    hover:bg-[#FFDF6D]
    hover:text-black
`
