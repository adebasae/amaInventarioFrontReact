import Cookies from 'universal-cookie';
import api from '../api/api';

const SECOND = 60;
const MINUTES = 60;
const TIME_COOKIE = SECOND * MINUTES;

export const removeCookie = (name) => {
  const cookies = new Cookies();
  cookies.set(name, '', { path: '/', expires: new Date(Date.now()) });
};

export const sendServerWithCookie = (nameCookie, path) => {
  const cookies = new Cookies();
  const cookie = cookies.get(nameCookie);

  if (cookie !== undefined) {
    const promise = new Promise((resolve) => {
      resolve(cookie);
    });
    return promise;
  }

  return api.get(path, {}).then((res) => {
    cookies.set(nameCookie, res, {
      path: '/',
      maxAge: TIME_COOKIE
    });
    return res;
  });
};
