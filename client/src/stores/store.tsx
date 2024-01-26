import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './User/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";

// 아래는 localStorage에 적용될 내용 : "root"라는 이름으로 storage, 즉 localStorage에 저장한다.
// 최종적으로 저장될 때는 persist(라이브러리의 네임스페이스):root(본인이 설정한 것)로 표시된다.
const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    //authSlice에서 정의된 name을 authReducer로 임의로 reducer에 이름을 붙인 것이다.
    signup:authReducer
})

// rootReducer에 대한 persist 설정을 적용
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

// persistor 생성
export const persistor = persistStore(store);

// 밑은 export를 해서 다른 페이지에서 useSelector로 접근 시 RootState로 정의 후 state.store에서 정의한 리듀서 이름으로 접근한다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
