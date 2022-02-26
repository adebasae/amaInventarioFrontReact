import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import useAPILoading from '../hooks/useLoading';

const ax = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}); // export this and use it in all your components

// eslint-disable-next-line import/prefer-default-export
export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const { setApiLoading } = useAPILoading();

  // eslint-disable-next-line no-shadow
  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter],
  ); // add to counter
  // eslint-disable-next-line no-shadow
  const dec = useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter],
  ); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config: AxiosRequestConfig) => {
        inc();
        const configActive = config;
        const token = Cookies.get('token');
        if (token) {
          configActive.headers['X-AUTH-TOKEN'] = `${token}`;
        }
        console.log('peticion');
        setApiLoading(true);

        return configActive;
      },
      response: (response: AxiosResponse) => {
        dec();
        console.log('fin peticion');
        setApiLoading(false);
        return response;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (error: any) => {
        dec();
        // console.log('fin peticion con error');
        setApiLoading(false);
        return Promise.reject(error);
      },
    }),
    [inc, dec, setApiLoading],
  ); // create the interceptors

  useEffect(() => {
    // add request interceptors
    ax.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    ax.interceptors.response.use(interceptors.response, interceptors.error);
    // return () => {
    //   // remove all intercepts when done
    //   // const { error, request, response } = interceptors;
    //   // ax.interceptors.request.eject(request);
    //   // ax.interceptors.request.eject(error);
    //   // ax.interceptors.response.eject(response);
    //   // ax.interceptors.response.eject(error);
    //
    // };
  }, [interceptors]);

  return [counter > 0];
};

export default ax;

// const GlobalLoader = () => {
//   const [loading] = useAxiosLoader();
//
//   return <div>{loading ? 'loading' : 'not loading'}</div>;
// };
