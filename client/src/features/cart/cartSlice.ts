import { createSelector, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const existingItem = state.items.find(item => item.product._id === payload.product._id)

      if (existingItem) {
        const items = state.items.map(item => (
          item.product._id === existingItem.product._id
            ? { ...payload, qty: payload.qty + item.qty }
            : item
        ))
        return {
          ...state,
          items
        }
      } else {
        return {
          ...state,
          items: [...state.items, payload]
        }
      }
    },
    remove: (state, { payload }) => {
      state.items.filter(item => item._id !== payload._id)
    },
    update: (state, { payload }) => {
      const existingItem = state.items.find(item => item.product._id === payload.product._id)
      const items = state.items.map(item => (
        item.product._id === existingItem.product._id
          ? payload
          : item
      ))
      return {
        ...state,
        items
      }
    }
  }
})

export const { add, update, remove } = cartSlice.actions

export const selectCount = createSelector(
  state => state.cart.items,
  items => {
    if (items.length > 0) {
      const count = items.reduce((total, item) => total + item.qty, 0)
      return count
    } else {
      return 0
    }
  }
)

export const selectItemById = (id: string) => createSelector(
  state => state.cart.items,
  items => {
    if (items.length > 0) {
      const item = items.find(item => item.product._id === id)
      return item
    }
    return null
  }
)

export default cartSlice.reducer
