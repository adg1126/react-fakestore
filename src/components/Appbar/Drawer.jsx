import {
  Drawer as MaterialDrawer,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@material-tailwind/react';

export default function Drawer({ setDrawerOpen, drawerOpen, categoriesArr }) {
  return (
    <MaterialDrawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      placement='right'
    >
      <div className='mb-2 flex items-center justify-between p-4'>
        <Typography
          variant='h5'
          color='blue-gray'
        >
          Fakestore
        </Typography>
        <IconButton
          variant='text'
          color='blue-gray'
          onClick={() => setDrawerOpen(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </IconButton>
      </div>

      <List>
        {categoriesArr?.length &&
          categoriesArr.map((c, i) => (
            <ListItem
              key={i}
              className='ml-2'
            >
              {c}
            </ListItem>
          ))}
      </List>
    </MaterialDrawer>
  );
}
