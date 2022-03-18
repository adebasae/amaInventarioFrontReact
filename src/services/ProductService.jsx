import { trackPromise } from 'react-promise-tracker';
import { sendServerWithCookie } from './utils';
import api from '../api/api';

const ProductService = {
  getAllProducts: () => trackPromise(api.get('/product', {})),
  getProductById: (id) =>
    trackPromise(sendServerWithCookie('productDetail', `/product/${id}`)),
  addCar: (color, store, id) => {
    const param = { color, store, id };
    const url = '/cart';
    return trackPromise(api.post(url, param));
  }
};

export default ProductService;
