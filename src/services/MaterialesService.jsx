import { trackPromise } from 'react-promise-tracker';
import api from '../api/api';

const MaterialesService = {
  getAllMaterialesToDDL: () => trackPromise(api.get('allMaterialesToDDL', {})),
  getAllMateriales: () => trackPromise(api.post('allMateriales', {})),
  getMaterialesByIdProducto: (id) =>
    trackPromise(api.post('getMaterialesByIdProducto', { id })),
  getMaterialesByIdProductoDDL: (id) =>
    trackPromise(api.post('getMaterialesByIdProductoDDL', { id })),
  saveMaterial: (material) =>
    trackPromise(api.post('saveMaterial', { material }))
};

export default MaterialesService;
