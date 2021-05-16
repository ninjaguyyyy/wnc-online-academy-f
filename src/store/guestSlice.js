import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    guest:null
};

const guest = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    asd:(state,{payload})=>{
        console.log(payload)
    }
  },
});

const { reducer, actions } = guest;
export const { asd } = actions;
export default reducer;
