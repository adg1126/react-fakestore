import { useEffect } from 'react';
import {
  fetchProducts,
  selectProductsArr,
  selectProductsArrStatus,
  fetchProductsArrByPrice,
  fetchProductsArrByCategory,
  fetchProductsArrBySort,
} from './redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Appbar from './components/Appbar/Appbar';
import Filter from './components/Filter';

function App() {
  const dispatch = useDispatch();
  const productsArr = useSelector(selectProductsArr),
    productsArrStatus = useSelector(selectProductsArrStatus);

  useEffect(() => {
    if (productsArrStatus === 'idle') {
      dispatch(fetchProducts());
    }

    dispatch(fetchProductsArrByPrice());
    dispatch(fetchProductsArrByCategory());
    dispatch(fetchProductsArrBySort());
  }, [productsArrStatus, dispatch, productsArr]);

  return (
    <main className='w-full'>
      <Appbar>
        <Filter />
      </Appbar>
    </main>
  );
}

export default App;
