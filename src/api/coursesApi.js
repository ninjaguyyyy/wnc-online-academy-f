import axiosClient from "./axiosClient";
import { ApiUrl } from "./authUser";

const coursesAPI = {
  getAll: (params) => {
    const url = `${ApiUrl}courses/`;
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `${ApiUrl}courses/${id}`;
    return axiosClient.get(url);
  },
};

export default coursesAPI;
