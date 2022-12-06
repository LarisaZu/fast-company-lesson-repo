import { authRequest } from './axios';

const authApi = {
  signup: async data => {
    const res = await authRequest.post(
      `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`,
      data,
    );

    return res;
  },
  login: async data => {
    const res = await authRequest.post(
      `accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`,
      data,
    );

    return res;
  },
};

export default authApi;
