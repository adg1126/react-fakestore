import { useSelector } from 'react-redux';
import { selectFilteredProductsArr } from '../redux/productsSlice';

import Card from './Card';

export default function ProductsList() {
  const filteredProductsArr = useSelector(selectFilteredProductsArr);

  return (
    <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
      {filteredProductsArr?.length &&
        filteredProductsArr.map((p, i) => (
          <Card
            key={i}
            {...p}
          />
        ))}
    </div>
  );
}
