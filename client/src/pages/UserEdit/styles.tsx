import styled from "tailwind-styled-components";
import { Link } from 'react-router-dom';
export const ProfileImg = styled.img`
    w-[150px] h-[150px]
    mb-[8%]
    rounded-full
`

export const Input = styled.input`
    w-[65%] 
    border-b-2 border-[#533C00]
`

export const Title = styled.div`
    text-[#533C00]
`

export const Submit = styled.button`
    btn
    hover:bg-black
    w-[27%]
    h-[40px]
    mr-[7%]
    bg-yellow-800
    shadow-md  
    rounded-full
    text-[white]
`

export const StyleLink = styled(Link)`
    text-blue-700
`

export const Wrapper = styled.div`
    mb-[2%]
`

export const Wrapper2 = styled.div`
    flex-col
    mb-[2%] 
    justify-around
`

export const Wrapper3 = styled.div`
    mt-[14%]
    flex 
    justify-center
`

export const ProfileWrapper = styled.div`
    flex 
    justify-center
`

export const Layout = styled.div`
`

export const Container = styled.div`
    mt-[5%]
`

export const SubContainer = styled.div`
    mt-[13%]
    ml-[7%]
`