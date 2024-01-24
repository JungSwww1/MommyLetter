import {configureStore} from "@reduxjs/toolkit";
import authReducer from './User/authSlice'

export const store = configureStore({
    reducer: {
        // signup에 해당되는 이름은 authSlice에서 정의된 이름
        // authReducer에 해당되는 이름은 임의로 정하는 것. : authSlice 맨 밑줄 참조
        signup : authReducer
    },
});

// 밑은 export를 해서 다른 페이지에서 useSelector로 접근 시 RootState로 정의 후 state.store에서 정의한 리듀서 이름으로 접근한다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;