import axios from 'axios';
import configFile from '../../config/config.json';

const request = axios.create({
  baseURL: configFile.base_url,
});

const authRequest = axios.create({ baseURL: configFile.firebase_auth_url });

request.interceptors.response.use(
  res => res,
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log('Unexpected Error');
    } else {
      return Promise.reject(error);
    }
  },
);

const firebaseApi = axios.create({
  baseURL: configFile.firebase_url,
});

firebaseApi.interceptors.request.use(
  config => {
    if (configFile.isFirebase) {
      const isContainSlash = /\/$/gi.test(config);
      config.url =
        (isContainSlash ? config.url.slice(0, -1) : config.url) + '.json';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

firebaseApi.interceptors.response.use(
  res => res,
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log('Unexpected Error');
    } else {
      return Promise.reject(error);
    }
  },
);

export { firebaseApi, authRequest };
export default request;
