import axiosClient from './axiosClient'
const authApi = {
  registerApi: (data) => {
    const url = '/users/register' 
    return axiosClient.post(url,data);
  },
  signInApi: (data)=>{
    const url = '/users/login'
    return axiosClient.post(url,data)
  },
  changePassword: (data)=>{
    const url='/users/change-password'
    const submitdata={
      oldPassword:data.oldPassword,
      newPassword:data.newPassword
    }
    return axiosClient.post(url,submitdata)
  }
};
export default authApi;
