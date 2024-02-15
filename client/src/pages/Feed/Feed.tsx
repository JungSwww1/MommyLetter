import React, {useEffect, useRef, useState } from "react";
import { Layout, MainContainer } from "@/pages/Feed/styles";
import axios from "axios";
import MainFeed from "@/components/Feed";
import LogoWhite from "@/assets/icons/logo";
import AlertModal from "@/pages/Feed/AlertModal";
import FeedAddButton from "@/assets/icons/FeedAddButton";
import Menu from "@/pages/Feed/AddModal/FeedMenuModal";
import {FeedWrite} from "@/components/Feed/FeedWriteModal/FeedWrite"
import {BoardProps} from "@/pages/type/types";
import './index.css'

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
    const [allBoards, setAllBoards] = useState<BoardProps[]>([]);
    // 아래는 보여줄 데이터
    const [displayBoards, setDisplayBoards] = useState<BoardProps[]>([]);
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

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const addFeed = () => {
        (document.getElementById('my_modal_3') as any).showModal()
    }
    const sort = () => {
        alert("정렬 완료")
    }
    return (
        <Layout>
            <MainContainer>
                {displayBoards.map((board) => (
                    <MainFeed key={board.boardId} authUserId={authUserId} board={board}/>
                ))}
                {load &&
                    <div className={"flex flex-col justify-center items-center"}>
                        <div><LogoWhite fill={"black"}/></div>
                        <div className="py-3 bg-floralwhite text-center">로딩 중...</div>
                    </div>
                }
                {hasMore && (
                    // 아래는 관측 지점
                    <div ref={obsRef} className="invisible py-3">
                        Observer Element
                    </div>
                )}
                <div className="feed-body fixed bottom-10" onClick={toggleMenu}>
                    <FeedAddButton />
                    {showMenu && (
                        <div className="MenuModal absolute top-full right-0 z-100">
                            <Menu onEdit={addFeed} onDelete={sort} onClose={toggleMenu} />
                        </div>
                    )}
                </div>
                <FeedWrite/>
            </MainContainer>
        </Layout>
    );
};

export default Feed;
