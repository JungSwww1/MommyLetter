import{createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SignupUserState {
    nickname: string,
    password : string,
    email : string,
}

const initialState : SignupUserState = {
    nickname:"",
    password:"",
    email:"",
};

const authSlice = createSlice({
    name : "signup",
    initialState,
    reducers: {
        setSignupUser :(state, action:PayloadAction<SignupUserState>) => {
            state.nickname = action.payload.nickname;
            state.password = action.payload.password;
            state.email    = action.payload.email;
        },
    }
})

// 아래의 내용은 dispatch에서 사용되는 내용들을 사용하기 위함.
export const { setSignupUser } = authSlice.actions;
// 아래는 authSlice에 들어있는 reducers들의 내용들을 store에 등록한다. store에서 임의의 이름으로 설정
// authSlice에서 정의한 모든 액션과 그에 해당하는 리듀서들을 포함
export default authSlice.reducer;