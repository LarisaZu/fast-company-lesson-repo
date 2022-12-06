import { firebaseApi } from './axios';

const userUrl = 'user/';

const userApi = {
  get: async () => {
    const { data } = await firebaseApi.get(userUrl);

    return data;
  },
  create: async user => {
    const { data } = await firebaseApi.put(userUrl + user._id, user);

    return data;
  },
  getById: async id => {
    const { data } = await firebaseApi.get(userUrl + id);

    return data;
  },
};

export default userApi;
