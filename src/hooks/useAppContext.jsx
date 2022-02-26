import { useContext } from 'react';
import { AppContext } from '../store/AppContext';

function useAppContext() {
  const { carCount, setCarCount } = useContext(AppContext);
  return { carCount, setCarCount };
}

export default useAppContext;
