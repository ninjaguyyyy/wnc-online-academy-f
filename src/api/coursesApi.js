import axiosClient from "./axiosClient";
import { ApiUrl } from "./authUser";

const coursesAPI = {
  getAll: (params) => {
    const url = `${ApiUrl}courses/`;
    return axiosClient.get(url, { params });
  },
};

export default coursesAPI;
