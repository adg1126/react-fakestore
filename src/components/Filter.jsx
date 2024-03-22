import { Typography, Select, Option, Input } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductsArr,
  selectProductCategoriesArr,
  setFilterOptions,
} from '../redux/productsSlice';
import Products from './Products';

const sortOptionsArr = ['Default', 'Price Low to High', 'Price High to Low'];

export default function Filter() {
  const productsArr = useSelector(selectProductsArr),
    productCategoriesArr = useSelector(selectProductCategoriesArr);

  const dispatch = useDispatch();

  const handleSetMinPrice = (e) => {
    dispatch(setFilterOptions({ option: 'minPrice', newVal: e.target.value }));
  };

  const handleSetMaxPrice = (e) => {
    dispatch(setFilterOptions({ option: 'maxPrice', newVal: e.target.value }));
  };

  const handleSetCategory = (category) => {
    dispatch(setFilterOptions({ option: 'category', newVal: category }));
  };

  const handleSetSortBy = (sort) => {
    dispatch(setFilterOptions({ option: 'sort', newVal: sort }));
  };

  return (
    productsArr.length && (
      <section className='mt-8 flex flex-col items-center gap-y-8'>
        <div className='w-5/6 h-1/6 flex flex-row gap-x-12 justify-center'>
          <div className='flex flex-col'>
            <Typography variant='h5'>FILTER YOUR SEARCH</Typography>
            <Typography variant='paragraph'>
              {productsArr.length} products
            </Typography>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Typography variant='h6'>Filter by</Typography>
            <div className='flex flex-row gap-x-12'>
              <div className='flex flex-row gap-x-6'>
                <Input
                  type='number'
                  onChange={handleSetMinPrice}
                  className='w-full'
                  variant='standard'
                  label='Min. amount'
                  placeholder='$1'
                />
                <Input
                  onChange={handleSetMaxPrice}
                  type='number'
                  className='w-full'
                  variant='standard'
                  label='Max. amount'
                  placeholder='$1000'
                />
              </div>
              <div>
                <Select
                  variant='standard'
                  label='Category'
                  onChange={handleSetCategory}
                >
                  {productCategoriesArr?.length &&
                    productCategoriesArr.map((p, i) => (
                      <Option
                        key={i}
                        value={p}
                      >
                        {p}
                      </Option>
                    ))}
                </Select>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Typography variant='h6'>Sort by</Typography>
            <div>
              <Select
                variant='standard'
                label='Default'
                onChange={handleSetSortBy}
              >
                {sortOptionsArr.map((s, i) => (
                  <Option
                    key={i}
                    value={s}
                  >
                    {s}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <Products productsArr={productsArr} />
      </section>
    )
  );
}
