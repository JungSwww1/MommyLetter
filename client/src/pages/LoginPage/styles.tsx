import styled from "tailwind-styled-components";
import { Link } from 'react-router-dom';

export const Main = styled.div`
    bg-[#FFDF6D]
    h-full
`

export const Input = styled.input`
    w-full
    max-w-[43.5%]
    h-9
    absolute left-[30.88%]
    text-[15px]
    text-left
    text-[#a0a0a0]
    border-2
    text-center
    rounded-[6px]
`

export const Img = styled.img`
    w-full
    max-w-[25%]
    h-[183px]
    relative left-[39.23%]
    top-[120px]
`

export const LoginButton = styled.button`
    w-full
    max-w-[43.5%]
    h-9
    absolute left-[30.88%]
    top-[470px]
    text-[15px]
    text-left
    text-[#a0a0a0]
    border-2
    text-center
    bg-[#FF78E9]
    text-white
    rounded-[6px]
`

export const CheckBox = styled.input`
    absolute left-[30.88%] top-[530px]
`

export const StyleLink = styled(Link)`
    absolute top-[526px]
    text-[13px]
    text-left
    text-[#a0a0a0]
`

export const RegisterButton = styled.button`
    w-full
    max-w-[14%]
    h-[28px]
    absolute left-[59.5%]
    top-[560px]
    text-[15px]
    text-left
    text-[#a0a0a0]
    border-2
    text-center
    mt-[1%]
    bg-[#FF78E9]
    text-white
    rounded-[6px]
`
