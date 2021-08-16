import axiosClient from './axiosClient';

export const ApiUrl = 'https://wnc-online-academy-21.herokuapp.com/';
// export const ApiUrl = "http://localhost:3001/";

const authApi = {
  registerApi: (data) => {
    const url = `${ApiUrl}users/register`;
    return axiosClient.post(url, data);
  },
  signInApi: (data) => {
    const url = `${ApiUrl}users/login`;
    return axiosClient.post(url, data);
  },
  changePassword: (data) => {
    const url = `${ApiUrl}users/change-password`;
    const submitdata = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    return axiosClient.post(url, submitdata);
  },
  refreshToken: (data) => {
    const url = `${ApiUrl}users/refresh-token`;
    return axiosClient.post(url, data);
  },
  getCourseById: (data) => {
    const url = `${ApiUrl}courses/${data}`;
    return axiosClient.get(url);
  },
  verifyOTP: (data) => {
    const url = `${ApiUrl}users/otp-verify`;
    return axiosClient.post(url, data);
  },
};
export default authApi;
