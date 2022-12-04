import axios from './axios';

const userApi = {
  get: async () => {
    const { data } = await axios.get('user/');

    return data;
  },
};

export default userApi;
