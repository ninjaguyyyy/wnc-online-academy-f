import axiosClient from './axiosClient'
const teacherApi = {
  updateProfile: (data) => {
    const url = '/users/profile/update' 
    return axiosClient.put(url,data);
  }
};
export default teacherApi;
