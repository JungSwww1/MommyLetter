import {Layout, MainContainer} from "@/pages/Feed/styles";

import Header from "@/pages/Profile/Header";
import Footer from "@/pages/Profile/Footer";
import MainFeed from "@/components/Feed/index"

const Feed = () => {
    return (
        <Layout>
            <Header/>
            <MainContainer>
               <MainFeed/>
            </MainContainer>
            <Footer/>
        </Layout>
    )
}

export default Feed;