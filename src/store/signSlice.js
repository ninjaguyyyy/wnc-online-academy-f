import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/authUser';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  signUp:{
    loading:false,
    user:null
  }
};
export const getMe= createAsyncThunk('sign/getMe',async (params,thunkAPI)=>{
  const user= await userApi.getMe();
  return user;
})
const sign = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    signUp:(state,{payload})=>{
      state.signUp.user=payload
      setTimeout(() => {
        toast.success("MY SUCCESS")
        toast.error('My error')
      }, 3000);
    }
  },
  extraReducers:{
    [getMe.pending]:(state)=>{
      state.signUp.loading=true
    },
    [getMe.rejected]:(state)=>{
      state.signUp.loading=false
      state.signUp.error='Fail to sign up'
    },
    [getMe.fulfilled]:(state,action)=>{
      state.signUp.loading=false
      state.signUp.user=action.payload
    }
  }
});

const { reducer, actions } = sign;
export const { signUp } = actions;
export default reducer;
