import axios from './axios';

const professionApi = {
  get: async () => {
    const { data } = await axios.get('profession/');

    return data;
  },
};

export default professionApi;
