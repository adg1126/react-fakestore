import {
  Typography,
  Select,
  Option,
  Input,
  Button,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductsArr,
  selectProductCategoriesArr,
  selectProductsFilterOptions,
  setFilterOptions,
  resetFilterOption,
  fetchProductsArrByPrice,
  fetchProductsArrByCategory,
  fetchProductsArrBySort,
} from '../redux/productsSlice';
import ProductsList from './ProductsList';

const sortOptionsArr = ['Default', 'Price Low to High', 'Price High to Low'];

export default function Filter() {
  const productsArr = useSelector(selectProductsArr),
    productCategoriesArr = useSelector(selectProductCategoriesArr),
    filterOption = useSelector(selectProductsFilterOptions);

  const {
    price: { min, max },
    category,
    sortBy,
  } = filterOption;

  const dispatch = useDispatch();

  const handleSetMinPrice = (e) => {
    dispatch(setFilterOptions({ option: 'minPrice', newVal: e.target.value }));
    dispatch(fetchProductsArrByPrice());
  };

  const handleSetMaxPrice = (e) => {
    dispatch(setFilterOptions({ option: 'maxPrice', newVal: e.target.value }));
    dispatch(fetchProductsArrByPrice());
  };

  const handleSetCategory = (category) => {
    dispatch(setFilterOptions({ option: 'category', newVal: category }));
    dispatch(fetchProductsArrByCategory());
  };

  const handleSetSortBy = (sortBy) => {
    dispatch(setFilterOptions({ option: 'sortBy', newVal: sortBy }));
    dispatch(fetchProductsArrBySort());
  };

  const handleResetFilterOption = () => {
    dispatch(resetFilterOption());
  };

  return (
    productsArr.length && (
      <section className='mt-8 flex flex-col items-center gap-y-8'>
        {/* Filter */}
        <div className='w-[90vw] lg:w-5/6 h-1/6 flex flex-wrap gap-x-12 gap-y-6 justify-start flex-col lg:flex-row lg:justify-center lg:flex-nowrap'>
          <div className='flex flex-col'>
            <Typography variant='h5'>FILTER YOUR SEARCH</Typography>
            <Typography variant='paragraph'>
              {productsArr.length} products
            </Typography>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Typography variant='h6'>Filter by</Typography>
            <div className='flex flex-col md:flex-row gap-x-12'>
              <div className='flex flex-col md:flex-row gap-x-6'>
                <Input
                  type='number'
                  onChange={handleSetMinPrice}
                  className='w-full'
                  variant='standard'
                  label='Min. amount'
                  placeholder='$1'
                  value={min}
                />
                <Input
                  onChange={handleSetMaxPrice}
                  type='number'
                  className='w-full'
                  variant='standard'
                  label='Max. amount'
                  placeholder='$1000'
                  value={max}
                />
              </div>
              <div>
                <Select
                  variant='standard'
                  label='Category'
                  onChange={handleSetCategory}
                  value={category}
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
                value={sortBy}
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
          <div className='flex flex-col justify-center'>
            <Button
              size='md'
              variant='outlined'
              onClick={handleResetFilterOption}
            >
              reset
            </Button>
          </div>
        </div>

        {/* Products List */}
        <ProductsList />
      </section>
    )
  );
}
