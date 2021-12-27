import axios from 'axios';
import md5 from 'js-md5';

import {SECRET_KEY, API_URL} from './constants';

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  function (config) {
    console.log('---axios.interceptors.request---', config.url.indexOf('wp-json'));
    if (config.data) {
      if (config.url.indexOf('wp-json') < 1) {
        const jsonData = JSON.stringify(config.data);
        const signature = md5(SECRET_KEY + jsonData);
        config.headers.Signature = signature;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
