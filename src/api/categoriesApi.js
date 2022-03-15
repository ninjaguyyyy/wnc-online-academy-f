import axiosClient from './axiosClient';

const categoriesAPI = {
  getAll: () => {
    const url = `/categories/`;
    return axiosClient.get(url);
  },
  getTree: () => {
    const url = `/categories/tree`;
    return axiosClient.get(url);
  },
};

export default categoriesAPI;
