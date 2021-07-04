import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  signUp:{
    loading:false,
    err:null
  },
  signIn:null
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
    signIn:(state,{payload})=>{
      state.signIn=payload
      if(payload.msg)
        toast.error(payload.msg)
      else
        toast.success('Successfully login')
    }
  }
});

const { reducer, actions } = sign;
export const { signUp,signIn } = actions;
export default reducer;
