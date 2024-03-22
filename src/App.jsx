import { useEffect } from 'react';
import {
  fetchProducts,
  selectProductsArr,
  selectProductsArrStatus,
} from './redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Appbar from './components/Appbar/Appbar';
import Card from './components/Card';
import Filter from './components/Filter';

function App() {
  const dispatch = useDispatch();
  const productsArr = useSelector(selectProductsArr),
    productsArrStatus = useSelector(selectProductsArrStatus);

  useEffect(() => {
    if (productsArrStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productsArrStatus, dispatch, productsArr]);

  return (
    <main className='w-full'>
      <Appbar>
        {/* {productsArr.length &&
          productsArr.map((p, i) => (
            <Card
              key={i}
              {...p}
            />
          ))} */}
        <Filter />
      </Appbar>
    </main>
  );
}

export default App;
