import React, { useCallback, useEffect, useRef, useState } from "react";
import { Layout, MainContainer } from "@/pages/Feed/styles";
import { allBoardList } from "@/apis/Board/boardApi";
import axios from "axios";
import RandomCat from "@/pages/Feed/RandomCat";

interface Board {
    board_id: number;
    user_id: number;
    content: string;
}

const Feed: React.FC = () => {
    const [boardList, setBoardList] = useState<Board[]>([]);
    const [page, setPage] = useState<number>(1);
    const [load, setLoad] = useState<boolean>(true);
    const preventRef = useRef<boolean>(false);
    const obsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getBoard();
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => {
            observer.disconnect();
        };
    }, [page]);

    const obsHandler: IntersectionObserverCallback = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !preventRef.current) {
            preventRef.current = true;
            setPage((prev) => prev + 1);
        }
    };

    const getBoard = useCallback(async () => {
        if (!preventRef.current) {
            // Fetch 2 data only if not already fetching
            setLoad(true);
            try {
                const res = await axios.get(`http://localhost:8080/boards`, {
                    params: { page, perPage: 2 }, // Adjust the API to support pagination and set the number of items per page
                });

                if (res.data && res.data.length > 0) {
                    setBoardList((prev) => (page === 1 ? [...res.data] : [...prev, ...res.data]));
                } else {
                    console.log("No data received from the API");
                }
            } catch (error) {
                console.error("Error fetching board data:", error);
            } finally {
                setLoad(false);
            }
        }
    }, [page]);

    return (
        <Layout>
            <MainContainer>
                {boardList.map((board) => (
                    <div key={board.board_id} className="h-[500px] board-item">
                        <p>{`게시물 내용: ${board.content}`}</p>
                    </div>
                ))}
                {load && <div className="py-3 bg-blue-500 text-center">로딩 중</div>}
                <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">
                    옵저버 Element
                </div>
                {/*<RandomCat/>*/}
            </MainContainer>
        </Layout>
    );
};

export default Feed;
