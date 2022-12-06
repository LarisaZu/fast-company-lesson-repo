import axios, { firebaseApi } from './axios';

const qualityApi = {
  get: async () => {
    const { data } = await firebaseApi.get('quality/');

    return data;
  },
};

export default qualityApi;
