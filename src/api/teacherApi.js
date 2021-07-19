import axiosClient from './axiosClient'
// import axios from 'axios'

const teacherApi = {
  updateProfile: (data) => {
    const url = '/users/profile/update' 
    return axiosClient.put(url,data);
  },
  createCourses: (data) => {
    var formData = new FormData();
    const url='/courses'
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    return axiosClient.post(url,formData,{
      headers:{
        "Content-type": "multipart/form-data",
      }
    })
  }
};
// export const createCourses =(data)=>{
//   var formData = new FormData();
//   for (const [key, value] of Object.entries(data)) {
//     formData.append(key, value);
//   }
//   axios.post('/course',formData,{
//     headers:{
//       "Content-type": "multipart/form-data",
//       'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGVmYjA2NDI2NDk1ZTI5NjhkNGFmNWYiLCJyb2xlIjoyLCJpYXQiOjE2MjY2NzA1NDYsImV4cCI6MTYyNjY3NDE0Nn0.8VWnLwEJkstgzGGD4qbYqkwFhkfNsosn4IX9MCeEoKk'
//     }
//   }).then(res=>console(res))
// }
export default teacherApi;
