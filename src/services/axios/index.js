import axios from 'axios';
import config from '../../config/config.json';

const request = axios.create({
  baseURL: config.base_url,
});

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

export default request;
