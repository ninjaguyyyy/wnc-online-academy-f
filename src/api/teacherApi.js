import axiosClient from './axiosClient'
import { ApiUrl } from './authUser';

const teacherApi = {
  updateProfile: (data) => {
    const url = `${ApiUrl}users/profile/update`
    return axiosClient.put(url,data);
  },
  createCourses: (data) => {
    var formData = new FormData()
    const url=`${ApiUrl}courses`
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    return axiosClient.post(url,formData,{
      headers:{
        "Content-type": "multipart/form-data",
      }
    })
  },
  upLoad: (data) => {
    var formData = new FormData()
    formData.append('files',data)
    const url = `${ApiUrl}upload`
    return axiosClient.post(url,formData,{
      headers:{
        "Content-type": "multipart/form-data",
      }
    })
  },
  categoriesTree:()=>{
    const url=`${ApiUrl}categories/tree`
    return axiosClient.get(url)
  }
};
export default teacherApi;
