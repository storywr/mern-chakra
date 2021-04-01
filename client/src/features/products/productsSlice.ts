import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  products: [],
  status: 'idle',
  error: null
}

// Fetching products
export const fetchProducts: any = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get('/api/products')
  return res.data
})

// A slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: state => {
      state.status = 'loading'
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded'
      state.products = payload
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.status = 'failed'
      state.error = payload
    }
  }
})

// Three actions generated from the slice
export const { } = productsSlice.actions

// The reducer
export default productsSlice.reducer
