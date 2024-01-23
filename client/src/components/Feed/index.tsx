import {Layout} from "@/components/Feed/styles";
import logo from '@/assets/images/sample1.jpg'




const MainFeed = () => {
    return (
        <Layout>
            <div className={"flex"}>
                <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
                <p>고씨네 산모</p>
            </div>
            <div>contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent</div>
            <div className={"flex"}>
                <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
                <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
                <img src={logo} alt="Logo" className={"w-[50px] h-[50px]"}/>
            </div>
        </Layout>
    )
}

export default MainFeed