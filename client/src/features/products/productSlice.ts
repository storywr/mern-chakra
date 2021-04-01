import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  product: null,
  status: 'idle',
  error: null
}

// Fetching product
export const fetchProduct: any = createAsyncThunk('product/fetchProduct', async (productId: string) => {
  const res = await axios.get(`/api/products/${productId}`)
  return res.data
})

// A slice for product
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.pending]: state => {
      state.status = 'loading'
    },
    [fetchProduct.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded'
      state.product = payload
    },
    [fetchProduct.rejected]: (state, { payload }) => {
      state.status = 'failed'
      state.error = payload
    }
  }
})

// Three actions generated from the slice
export const { } = productSlice.actions

// The reducer
export default productSlice.reducer
