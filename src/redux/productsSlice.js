import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  errMessage: '',
  productsArr: [],
  filterOptions: {
    price: { min: 1, max: 1000 },
    category: '',
    sortBy: 'Default',
  },
  filteredProductsArr: [],
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
        : option === 'sortBy'
        ? (state.filterOptions.sortBy = newVal)
        : state;
    },
    fetchProductsArrByPrice(state) {
      let {
        filterOptions: { price },
        productsArr,
      } = state;

      if (state.filteredProductsArr?.length) {
        let toFilterArr = state.filteredProductsArr;

        state.filteredProductsArr = toFilterArr.filter((product) => {
          if (price.min && product.price < price.min) return false;
          if (price.max && product.price > price.max) return false;
          return true;
        });
      } else {
        state.filteredProductsArr = productsArr.filter((product) => {
          if (price.min && product.price < price.min) return false;
          if (price.max && product.price > price.max) return false;
          return true;
        });
      }
    },
    fetchProductsArrByCategory(state) {
      let {
        filterOptions: { category },
        productsArr,
      } = state;

      if (state.filteredProductsArr?.length) {
        let toFilterArr = state.filteredProductsArr;

        state.filteredProductsArr = toFilterArr.filter((product) => {
          if (category && product.category.name !== category) return false;
          return true;
        });
      } else {
        state.filteredProductsArr = productsArr.filter((product) => {
          if (category && product.category.name !== category) return false;
          return true;
        });
      }
    },
    fetchProductsArrBySort(state) {
      let {
        filterOptions: { sortBy },
        productsArr,
      } = state;

      if (state.filteredProductsArr?.length) {
        let toFilterArr = state.filteredProductsArr;

        if (sortBy === 'Default') state.filteredProductsArr = toFilterArr;
        else if (sortBy === 'Price Low to High') {
          state.filteredProductsArr = toFilterArr.sort(
            (a, b) => parseInt(a.price) - parseInt(b.price)
          );
        } else if (sortBy === 'Price High to Low') {
          state.filteredProductsArr = toFilterArr.sort(
            (a, b) => parseInt(b.price) - parseInt(a.price)
          );
        }
      } else {
        if (sortBy === 'Default') state.filteredProductsArr = productsArr;
        else if (sortBy === 'Price Low to High') {
          state.filteredProductsArr = productsArr.sort(
            (a, b) => parseInt(a.price) - parseInt(b.price)
          );
        } else if (sortBy === 'Price High to Low') {
          state.filteredProductsArr = productsArr.sort(
            (a, b) => parseInt(b.price) - parseInt(a.price)
          );
        }
      }
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
  ),
  selectFilteredProductsArr = createSelector(
    [selectProducts],
    (products) => products.filteredProductsArr
  );

export const {
  setFilterOptions,
  fetchProductsArrByPrice,
  fetchProductsArrByCategory,
  fetchProductsArrBySort,
} = productsSlice.actions;

export default productsSlice.reducer;
