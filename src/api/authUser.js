import axiosClient from './axiosClient'
const authApi = {
  registerApi: (data) => {
    const url = '/users/register' 
    return axiosClient.post(url,data);
  },
  signInApi: (data)=>{
    const url = '/users/login'
    return axiosClient.post(url,data)
  }
};
export default authApi;
