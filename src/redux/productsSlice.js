import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  errMessage: '',
  productsArr: [],
  filterOptions: {
    price: { min: 0, max: 0 },
    category: '',
    sortBy: '',
  },
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
  reducers: {
    setFilterOptions(state, action) {
      const { option, newVal } = action.payload;

      option === 'minPrice'
        ? (state.filterOptions.price.min = newVal)
        : option === 'maxPrice'
        ? (state.filterOptions.price.max = newVal)
        : option === 'category'
        ? (state.filterOptions.category = newVal)
        : option === 'sort'
        ? (state.filterOptions.sort = newVal)
        : state;
    },
  },
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

const selectProducts = (state) => state.products;

export const selectProductsArr = createSelector(
    [selectProducts],
    (products) => products.productsArr
  ),
  selectProductsArrStatus = createSelector(
    [selectProducts],
    (products) => products.status
  ),
  selectProductCategoriesArr = createSelector(
    [selectProductsArr],
    (productsArr) =>
      productsArr.length
        ? [...new Set(productsArr.map((p) => p.category.name))]
        : []
  ),
  selectProductsFilterOptions = createSelector(
    [selectProducts],
    (products) => products.filterOptions
  );

export const { setFilterOptions } = productsSlice.actions;

export default productsSlice.reducer;
