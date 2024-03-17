import { authActions } from "../slices/authSlice"
import request from "../../utils/request"
import {toast} from "react-toastify"

// login user 
export function loginUser(user) {
    return async (dispatch) => {
        try {
            const {data} = await request.post("/api/auth/login" , user)
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo" , JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);        
        }
    }
}
// logout user 
export function logoutUser() {
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo")
    }
}

// register user 
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const {data} = await request.post("/api/auth/register" , user)
            dispatch(authActions.register(data.message));
            localStorage.setItem("userInfo" , JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
}

// Verify Email
export function verifyEmail(userId,token) {
    return async (dispatch) => {
      try {
        await request.get(`/api/auth/${userId}/verify/${token}`);
        dispatch(authActions.setIsEmailVerified());
      } catch (error) {
        console.log(error);
      }
    }
  }





