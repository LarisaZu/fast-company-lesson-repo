import axios, { firebaseApi } from './axios';

const professionApi = {
  get: async () => {
    // const { data } = await axios.get('profession/');
    const { data } = await firebaseApi.get('profession/');

    return data;
  },
};

export default professionApi;
