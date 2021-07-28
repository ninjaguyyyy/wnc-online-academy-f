import axiosClient from './axiosClient'
export const ApiUrl='https://wnc-online-academy-21.herokuapp.com/'
const authApi = {
  registerApi: (data) => {
    const url = `${ApiUrl}users/register` 
    return axiosClient.post(url,data);
  },
  signInApi: (data)=>{
    const url = `${ApiUrl}users/login`
    return axiosClient.post(url,data)
  },
  changePassword: (data)=>{
    const url=`${ApiUrl}users/change-password`
    const submitdata={
      oldPassword:data.oldPassword,
      newPassword:data.newPassword
    }
    return axiosClient.post(url,submitdata)
  },
  refreshToken:(data)=>{
    const url=`${ApiUrl}users/refresh-token`
    return axiosClient.post(url,data)
  },
  getCourseById: (id)=>{
    const url=`${ApiUrl}courses/${id}`
    return axiosClient.get(url)
  }
};
export default authApi;
