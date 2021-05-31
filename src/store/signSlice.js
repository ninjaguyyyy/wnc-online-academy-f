import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const sign = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    setloginRole:(state,{payload})=>{
      state.login.role=payload
    }
  },
});

const { reducer, actions } = sign;
export const { setloginRole } = actions;
export default reducer;
