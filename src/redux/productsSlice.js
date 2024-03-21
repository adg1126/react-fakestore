import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  errMessage: '',
  productsArr: [],
};

const PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const res = await fetch(PRODUCTS_URL);
      return res.json();
    } catch (err) {
      return err.message;
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsArr = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.errMessage = action.payload;
      });
  },
});

export const selectProductsArr = (state) => state.productsArr,
  selectProductsArrStatus = (state) => state.status;

export default productsSlice.reducer;
