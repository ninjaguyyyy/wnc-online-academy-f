import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  signUp: {
    loading: false,
    err: null,
  },
  signIn: {
    loading: false,
    err: null,
  },
};

const sign = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    signUp: (state, { payload }) => {
      state.signUp.err = payload;
      if (payload.msg) toast.error(payload.msg);
      else toast.success('Successfully register');
    },
    setLoadingSignIn: (state, { payload }) => {
      state.signIn.loading = payload;
    },
    setLoadingSignUp: (state, { payload }) => {
      state.signIn.loading = payload;
    },
  },
});

const { reducer, actions } = sign;
export const { signUp, setLoadingSignIn, setLoadingSignUp } = actions;
export default reducer;
