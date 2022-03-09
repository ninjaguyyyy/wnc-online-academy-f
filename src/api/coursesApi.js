import axiosClient from './axiosClient';

const coursesAPI = {
  getAll: (params) => {
    const url = `/courses/`;
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/courses/${id}`;
    return axiosClient.get(url);
  },

  getByTeacher: (id) => {
    const url = `/courses/teacher/${id}`;
    return axiosClient.get(url);
  },

  postReview(courseId, review) {
    const url = `/courses/${courseId}/feedback`;
    return axiosClient.post(url, review);
  },
};

export default coursesAPI;
