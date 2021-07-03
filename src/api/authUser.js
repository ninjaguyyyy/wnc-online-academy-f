import axiosClient from './axiosClient'

const authApi = {
  register: (
    username,
    passWord,
    email,
    firstName,
    lastName,
    role
  ) => {
    const url = 'http://localhost:3001/'
    const body = {
      username,
      passWord,
      email,
      firstName,
      lastName,
      role
    }
    console.log('asd',body)
    return axiosClient.get(url).then(res=>console.log(res));
  },
};
export default authApi;
