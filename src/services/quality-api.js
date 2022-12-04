import axios from './axios';

const qualityApi = {
  get: async () => {
    const { data } = await axios.get('quality/');

    return data;
  },
};

export default qualityApi;
