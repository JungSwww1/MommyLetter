import { configureStore } from "@reduxjs/toolkit";
import authReducer from './User/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

// rootReducer에 대한 persist 설정을 적용
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

// persistor 생성
export const persistor = persistStore(store);

// 밑은 export를 해서 다른 페이지에서 useSelector로 접근 시 RootState로 정의 후 state.store에서 정의한 리듀서 이름으로 접근한다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
