import axiosClient from "./axiosClient";
import { ApiUrl } from "./authUser";

const coursesAPI = {
  getAll: () => {
    const url = `${ApiUrl}courses/`;
    return axiosClient.get(url);
  },

  getById: (id) => {
    const url = `${ApiUrl}courses/${id}`;
    return axiosClient.get(url);
  },

  postReview(courseId, review) {
    const url = `${ApiUrl}courses/${courseId}/feedback`;
    return axiosClient.post(url, review);
  },
};

export default coursesAPI;
