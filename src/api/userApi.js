import axiosClient from './axiosClient';

const userAPi = {
  updateProfile(data) {
    const url = `/users/profile/update`;
    return axiosClient.put(url, data);
  },

  upLoad(data) {
    var formData = new FormData();
    formData.append('files', data);
    const url = `/upload`;
    return axiosClient.post(url, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },

  addCoursesToFavorite(data) {
    const url = `/users/me/favorite-courses`;
    return axiosClient.post(url, data);
  },

  attendCourse(data) {
    const url = `/users/me/attend-courses`;
    return axiosClient.post(url, data);
  },

  deleteCoursesFromFavorite(id) {
    const url = `/users/me/favorite-courses/${id}`;
    return axiosClient.delete(url);
  },

  getProfile() {
    const url = `/users/profile`;
    return axiosClient.get(url);
  },

  getAttendedCourses() {
    const url = `/users/me/attended-courses`;
    return axiosClient.get(url);
  },
};

export default userAPi;
