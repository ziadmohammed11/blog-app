import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user :  localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")) : null ,
        registerMessage : null,
        isEmailVerified: false,
    },//
    reducers :{
        login(state , action){
            state.user = action.payload; 
            state.registerMessage = null;                                         // البيانات اللي هناخدها من السيرفر
        },
        logout(state){
            state.user = null;    
        },
        register(state,action){
            state.registerMessage = action.payload;
        },
        setUserPhoto(state,action){
            state.user.profilePhoto = action.payload;
        },
        setUsername(state,action){
            state.user.username = action.payload;
        },
        setIsEmailVerified(state) {
            state.isEmailVerified = true;
            state.registerMessage = null;
        }
    }
})

const authReducer = authSlice.reducer;         // for store 
const authActions = authSlice.actions;        // for api calls 

export {authActions , authReducer}