import { useEffect } from 'react';
import {
  fetchProducts,
  selectProductsArr,
  selectProductsArrStatus,
} from './redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const productsArr = useSelector(selectProductsArr),
    productsArrStatus = useSelector(selectProductsArrStatus);

  useEffect(() => {
    if (productsArrStatus === 'idle') {
      dispatch(fetchProducts());
    }
    console.log(productsArr);
  }, [productsArrStatus, dispatch, productsArr]);

  return <></>;
}

export default App;
