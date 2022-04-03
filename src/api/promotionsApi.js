import axiosClient from './axiosClient';
import { ApiUrl } from './authUser';

const promotionsAPI = {
  getAll: () => {
    const url = `${ApiUrl}/promotions/`;
    return axiosClient.get(url);
  },
};

export default promotionsAPI;
