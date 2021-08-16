import axiosClient from './axiosClient';
import { ApiUrl } from './authUser';

const categoriesAPI = {
  getAll: () => {
    const url = `${ApiUrl}categories/`;
    return axiosClient.get(url);
  },
  getTree: () => {
    const url = `${ApiUrl}categories/tree`;
    return axiosClient.get(url);
  },
};

export default categoriesAPI;
