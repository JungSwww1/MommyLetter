import {Layout, MainContainer} from "@/pages/Feed/styles";
import MainFeed from "@/components/Feed/index"
const Feed = () => {
    return (
        <Layout>
            <MainContainer>
                <MainFeed/>
            </MainContainer>
            <div>LAst</div>
        </Layout>
    )
}

export default Feed;