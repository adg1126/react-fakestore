import { Typography } from '@material-tailwind/react';

export default function Tabs({ categoriesArr }) {
  return (
    <div className='mr-4 hidden lg:block'>
      <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
        {categoriesArr?.length &&
          categoriesArr.map((c, i) => (
            <Typography
              key={i}
              as='li'
              variant='small'
              color='blue-gray'
              className='p-1 font-normal'
            >
              <a
                href='#'
                className='flex items-center'
              >
                {c}
              </a>
            </Typography>
          ))}
      </ul>
    </div>
  );
}
