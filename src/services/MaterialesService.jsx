import { trackPromise } from 'react-promise-tracker';
import api from '../api/api';

const MaterialesService = {
  getAllMateriales: () => trackPromise(api.get('allMateriales', {})),
  getMaterialById: (id) => trackPromise(api.get('materialDetail', { id }))
};

export default MaterialesService;
