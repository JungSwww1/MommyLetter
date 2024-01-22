import styled from "tailwind-styled-components";

export const Container = styled.div`
    flex flex-col items-center
`

export const ProfileContainer = styled.div`
    w-[100%]
    relative top-[-100px] 
    text-center
`

export const SubProfileContainer = styled.div`
    flex 
    justify-around
    mb-[5%]
    mt-[5%]
`

export const ContentContainer = styled.div`
    grid grid-cols-3
`

export const ContentWrapper = styled.div`
    m-2
    bg-gray-200
    h-[90px]
`

export const BackgroundImg = styled.img`
    w-full
    h-[250px] 
    rounded-bl-[15px] 
    rounded-br-[15px]
`

export const Img = styled.img`
    w-[183px]
    h-[183px]
    rounded-full
    mb-[4%]
    mx-auto
`

export const ProfileButton = styled.button`
    w-[45%]
    h-[30px]
    bg-gray-300
    rounded-[5px]
`
