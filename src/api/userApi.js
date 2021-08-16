import axiosClient from './axiosClient';
import { ApiUrl } from './authUser';

const userAPi = {
  updateProfile(data) {
    const url = `${ApiUrl}users/profile/update`;
    return axiosClient.put(url, data);
  },
  upLoad(data) {
    var formData = new FormData();
    formData.append('files', data);
    const url = `${ApiUrl}upload`;
    return axiosClient.post(url, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },

  addCoursesToFavorite(data) {
    const url = `${ApiUrl}users/me/favorite-courses`;
    return axiosClient.post(url, data);
  },

  attendCourse(data) {
    const url = `${ApiUrl}users/me/attend-courses`;
    return axiosClient.post(url, data);
  },

  deleteCoursesFromFavorite(id) {
    const url = `${ApiUrl}users/me/favorite-courses/${id}`;
    return axiosClient.delete(url);
  },

  getProfile() {
    const url = `${ApiUrl}users/profile`;
    return axiosClient.get(url);
  },

  getAttendedCourses() {
    const url = `${ApiUrl}users/me/attended-courses`;
    return axiosClient.get(url);
  },
};
export default userAPi;
