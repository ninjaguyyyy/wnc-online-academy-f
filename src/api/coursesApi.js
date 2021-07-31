import axiosClient from "./axiosClient";
import { ApiUrl } from "./authUser";

const coursesAPI = {
  getAll: () => {
    const url = `${ApiUrl}courses/`;
    return axiosClient.get(url);
  },
};

export default coursesAPI;
