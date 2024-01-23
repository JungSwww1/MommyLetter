import {Layout} from "@/components/Feed/styles";
import logo from '@/assets/images/sample1.jpg'
import Header from "@/pages/Profile/Header";
const MainFeed = () => {
    return (
        <Layout>
            <div className={"flex mb-[3%] justify-between"}>
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px] rounded-full mr-[5%]"}/>
                    <p>고씨네 산모</p>
                </div>
                <p>2024.01.25</p>
            </div>
            <div className="mb-[3%] bg-gray-300 p-4 rounded-md overflow-hidden">
                <p className="line-clamp-3">
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                    나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
                </p>
            </div>

            <div className={"flex"}>
                <div className="w-[60%] h-200[px] m-2">
                    <img src={logo} alt="Logo" className={"max-h-[200px]"}/>
                </div>
                <div className="h-200[px]">
                    <img src={logo} alt="Logo" className={"max-w-[100%] max-h-[200px]"}/>
                </div>
                <div className="h-200[px]">
                    <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
                </div>
            </div>
        </Layout>
)
}

export default MainFeed