import { trackPromise } from 'react-promise-tracker';
import api from '../api/api';

const MaterialesService = {
  getAllMateriales: () => trackPromise(api.get('allMateriales', {})),
  getMaterialesByIdProducto: (id) =>
    trackPromise(api.post('getMaterialesByIdProducto', { id })),
  saveMaterial: (material) =>
    trackPromise(api.post('saveMaterial', { material }))
};

export default MaterialesService;
