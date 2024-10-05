import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

// Async action to fetch products by category or all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ category, limit, skip, search }) => {
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
  }
  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
  }
  const response = await axios.get(url);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload.products];
      });
  },
});

export default productSlice.reducer;
