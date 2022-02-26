import Axios from 'axios';
import Cookies from 'js-cookie';
// import { getCookie } from '../components/utils';

const api = Axios.create({
  baseURL: process.env.REACT_APP_API,
  // withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
});
// api.defaults.headers.Authorization = `Bearer ${getCookie('token')}`;

// api.interceptors.request.use(
//   (config) => {
//     const configActive = config;
//     const token = Cookies.get('token');
//     if (token) {
//       configActive.headers['X-AUTH-TOKEN'] = `${token}`;
//     } else if (!config.url.includes('token')) document.location.href = `/`;
//     return configActive;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export const addToken = (token) => {
  api.defaults.headers['X-AUTH-TOKEN'] = token;
};

export const removeBearerToken = () => {
  // api.defaults.withCredentials = false;
  delete api.defaults.headers['X-AUTH-TOKEN'];
};

export const routes = {
  login: '/security/get/token',
  me: 'rest/get/config',
  access: `/rest/user/header/es/get/header`
};

export const getCookies = () => Cookies;

export default api;
