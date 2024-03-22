import { Typography, Select, Option, Input } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductsArr,
  selectProductCategoriesArr,
} from '../redux/productsSlice';

export default function Filter() {
  const productsArr = useSelector(selectProductsArr),
    productCategoriesArr = useSelector(selectProductCategoriesArr);

  console.log(productsArr);
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
          <div className='flex flex-col'>
            <Typography variant='h6'>Filter by price</Typography>
            <div className='flex flex-row gap-x-4'>
              <Input
                className='w-full'
                variant='standard'
                label='Min. amount'
                placeholder='$5'
              />
              <Input
                className='w-full'
                variant='standard'
                label='Max. amount'
                placeholder='$50'
              />
            </div>
          </div>
          <div>
            <Typography variant='h6'>Filter by category</Typography>
            <Select
              variant='standard'
              label='Category'
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
          <div>
            <Typography variant='h6'>Sort by</Typography>
            <div>
              <Select
                variant='standard'
                label='Default'
              >
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
          </div>
        </div>
        <div>catalog</div>
      </section>
    )
  );
}
