import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
// import Cookies from 'universal-cookie'
// const cookies = new Cookies()
// const userInfoLocalStorage = localStorage.getItem('userInfo');
// const userInfoInit = userInfoLocalStorage ? JSON.parse(userInfoLocalStorage) : null;

const initialState = {
  signUp:{
    loading:false,
    err:null
  },
  // signIn:userInfoInit,
};
const sign = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    signUp:(state,{payload})=>{
      state.signUp.err=payload
      if(payload.msg)
        toast.error(payload.msg)
      else
        toast.success("Successfully register")
    },
    // signIn:(state,{payload})=>{
    //   if(payload.msg)
    //     toast.error(payload.msg)
    //   else{
    //     // localStorage.setItem('userInfo', JSON.stringify(payload))
    //     toast.success('Successfully login')
    //     state.signIn=payload
    //   }
    // },
    // signOut:(state,{payload})=>{
    //   state.signIn=null
    //   localStorage.setItem('userInfo', JSON.stringify(payload))
    // }
  }
});

const { reducer, actions } = sign;
export const { signUp } = actions;
export default reducer;
