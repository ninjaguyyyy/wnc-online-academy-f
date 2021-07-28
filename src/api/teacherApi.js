import axiosClient from "./axiosClient";
import { ApiUrl } from "./authUser";

const teacherApi = {
  updateProfile: (data) => {
    const url = `${ApiUrl}users/profile/update`;
    return axiosClient.put(url, data);
  },
  createCourses: (data) => {
    const url = `${ApiUrl}courses`;
    return axiosClient.post(url, data);
  },
  upLoad: (data) => {
    var formData = new FormData();
    formData.append("files", data);
    const url = `${ApiUrl}upload`;
    return axiosClient.post(url, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },
  categoriesTree: () => {
    const url = `${ApiUrl}categories/tree`;
    return axiosClient.get(url);
  },
  // courses: ()=>{
  //   const url= `${ApiUrl}courses`
  //   return axiosClient.get(url)
  // },
  promotions:()=>{
    const url = `${ApiUrl}promotions`
    return axiosClient.get(url)
  },
  myCourses:()=>{
    const url = `${ApiUrl}users/me/own-courses`
    return axiosClient.get(url)
  }
};
export default teacherApi;
