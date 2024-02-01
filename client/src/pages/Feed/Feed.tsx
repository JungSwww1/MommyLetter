import React, {useEffect, useRef, useState } from "react";
import { Layout, MainContainer } from "@/pages/Feed/styles";
import axios from "axios";
import MainFeed from "@/components/Feed";

interface Board {
    boardId: number;
    content: string;
    createdDate: string;
    hashTagList: string[];
    photoList: string[];
    updatedDate: string;
    userId: number;
}

const Feed: React.FC = () => {
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
        // Fetch all data initially
        const fetchData = async () => {
            setLoad(true);
            try {
                const res = await axios.get(`http://localhost:8080/boards`);
                setAllBoards(res.data);
                // 여기서 보여줄 데이터의 수 설정
                setDisplayBoards(res.data.slice(0, chunkSize));
            } catch (error) {
                console.error("Error fetching board data:", error);
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
                    <MainFeed key={board.boardId} board={board}/>
                ))}
                {load && <div className="py-3 bg-floralwhite text-center">로딩 중</div>}
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
