import React from 'react';
import {Route, Routes} from "react-router-dom";

import ReserveDetailPage from "@/pages/Reserve/ResultDetail/page";


const ReservePage = () => {
    return (
        <div>
            <Routes>

                <Route path={"/:reserveId"} element={<ReserveDetailPage />} />
                <Route path={"/diary"}></Route>
            </Routes>
        </div>
    );
};

export default ReservePage;