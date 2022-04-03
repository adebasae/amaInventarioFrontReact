import { trackPromise } from 'react-promise-tracker';
import api from '../api/api';

const ProductService = {
  getAllProducts: () => trackPromise(api.get('/product', {})),
  getProductById: (id) => trackPromise(api.post(`/productDetail/${id}`, {})),
  getProductToSelect: () => trackPromise(api.post(`/product/toSelect`, {}))
};

export default ProductService;
