import React, {useEffect, useRef, useState } from "react";
import { Layout, MainContainer } from "@/pages/Feed/styles";
import axios from "axios";
import MainFeed from "@/components/Feed";
import LogoWhite from "@/assets/icons/logo";

interface Board {
    boardId: number;
    content: string;
    createdDate: string;
    category:string;
    updatedDate: string;
    hashTagList: { content: string; }[];
    photoList: string[];
    accountSimpleReponse: {
        nickname: string;
        userId : number;
        profilePhoto: string;
    };
}

const Feed: React.FC = () => {
    // localStorage에서 유저 가져오기
    const getAuthUserId = () => {
        const authData = localStorage.getItem('Auth');
        if (authData) {
            const authObject = JSON.parse(authData);
            return authObject.userId;
        }
        return 0;
    };
    const [authUserId, setAuthUserId] = useState<number>(getAuthUserId());

    // 모든 데이터를 담아준다
    const [allBoards, setAllBoards] = useState<Board[]>([]);
    // 아래는 보여줄 데이터
    const [displayBoards, setDisplayBoards] = useState<Board[]>([]);
    const [page, setPage] = useState<number>(1);
    // 데이터를 불러오고 있는 지의 여부. 데이터 불러오는 동안 중복 방지 용도
    const [load, setLoad] = useState<boolean>(false);
    // 페이지 당 보여줄 컨텐츠 수
    const chunkSize = 8;

    const obsRef = useRef<HTMLDivElement | null>(null);
    // 더 가져올 것이 있는지 확인용도 : 사용자가 끝까지 스크롤하면 false가 되어 데이터 안 보여준다.
    const hasMore = page * chunkSize < allBoards.length;

    useEffect(() => {
        // 전체 데이터 가져오기
        const fetchData = async () => {
            setLoad(true);
            try {
                const res = await axios.get(`http://i10a509.p.ssafy.io:8081/boards/list/${authUserId}`);
                setAllBoards(res.data);
                // 여기서 보여줄 데이터의 수 설정
                setDisplayBoards(res.data.slice(0, chunkSize));
            } catch (error) {
                console.error("피드를 가져오는 중 오류 발생 :", error);
            } finally {
                setLoad(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => {
            observer.disconnect();
        };
    }, [displayBoards]);

    const obsHandler: IntersectionObserverCallback = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !load) {
            setPage((prev) => prev + 1);
            const nextItems = allBoards.slice(page * chunkSize, (page + 1) * chunkSize);
            setDisplayBoards((prevBoards) => [...prevBoards, ...nextItems]);
        }
    };

    return (
        <Layout>
            <MainContainer>
                {displayBoards.map((board) => (
                    <MainFeed key={board.boardId} authUserId={authUserId} board={board}/>
                ))}
                {load &&
                    <div className={"flex flex-col justify-center items-center"}>
                        <div><LogoWhite/></div>
                        <div className="py-3 bg-floralwhite text-center">로딩 중...</div>
                    </div>
                }
                {hasMore && (
                    // 아래는 관측 지점
                    <div ref={obsRef} className="invisible py-3">
                        Observer Element
                    </div>
                )}
            </MainContainer>
        </Layout>
    );
};

export default Feed;
