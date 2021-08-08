import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

const userInfoLocalStorage = localStorage.getItem("userInfo");
const userInfoInit = userInfoLocalStorage ? JSON.parse(userInfoLocalStorage) : null;

const initialState = {
  token: cookies.get("token") || null,
  userInfo: userInfoInit,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveToken: (state, action) => {
      toast.success("Successfully login");
      state.token = action.payload;
      cookies.set("token", action.payload, { path: "/" });
    },
    removeToken: (state) => {
      state.token = null;
      state.userInfo = null;
      cookies.remove("token", { path: "/" });
      localStorage.setItem("userInfo", JSON.stringify(null));
      toast.success("Successfully logout");
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.favoriteCourses = action.payload.favoriteCourses;
      state.attendedCourses = action.payload.attendedCourses;
    },
    updateUserAttendedCourses(state, action) {
      state.userInfo.attendedCourses = action.payload;
    },
    updateProfile: (state, action) => {
      state.userInfo.firstName = action.payload.user.firstName;
      state.userInfo.lastName = action.payload.user.lastName;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      toast.success("Successfully update");
    },
    changePassword: (state) => {
      toast.success("Successfully update");
    },
    course: (state, action) => {
      state.course = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { saveToken, removeToken, saveUserInfo, updateProfile, changePassword, course, setLoading, updateUserAttendedCourses } =
  actions;
export default reducer;
