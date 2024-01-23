import {
    CommentContainer,
    ContextContainer,
    HashtagContainer,
    Layout,
    LikeIconContainer,
    PhotoContainer,
    TitleContainer, TitleWrapper
} from "@/components/Feed/styles";
import logo from '@/assets/images/sample1.jpg'
const MainFeed = () => {
    return (
        <Layout>
            <TitleContainer>
                <TitleWrapper>
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px] rounded-full"}/>
                    <p className={"text-[16px] font-bold"}>고씨네 산모</p>
                </TitleWrapper>
                <div>
                    <p>2024.01.25</p>
                    <p>icon area</p>
                </div>
            </TitleContainer>

            <ContextContainer>
                <p className="line-clamp-3">
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                </p>
            </ContextContainer>

            <PhotoContainer>
                <div className="w-[60%] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"max-h-[200px]"}/>
                </div>
                <div className="h-200[px] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"max-w-[100%] max-h-[200px]"}/>
                </div>
                <div className="h-200[px] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
                </div>
            </PhotoContainer>

            <HashtagContainer>
                <p>#hashtag</p>
            </HashtagContainer>

            <LikeIconContainer>
                <p className={"text-[13px] font-bold"}>좋아요 10개</p>
                <p>icon area</p>
            </LikeIconContainer>

            <CommentContainer>
                <p className={"text-[15px] font-bold"}>닉네임</p>
                <p className={"text-[15px]"}>sadasdasdasdasdasdasdasdasdasdasdss</p>
            </CommentContainer>
        </Layout>
    )
}

export default MainFeed