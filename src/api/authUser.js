import axiosClient from './axiosClient'
const authApi = {
  register: (data) => {
    const url = '/users/register' 
    return axiosClient.post(url,data);
  },
  signIn: (data)=>{
    const url = '/users/login'
    return axiosClient.post(url,data)
  }
};
export default authApi;
