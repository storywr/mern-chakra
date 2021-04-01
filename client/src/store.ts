import { configureStore } from '@reduxjs/toolkit'

import cart from './features/cart/cartSlice'
import product from './features/products/productSlice'
import products from './features/products/productsSlice'

export interface Product {
  _id: string | number
  name: string
  image: string
  price: number
  numReviews: number
  rating: number
  description: string
  countInStock: number
}

export interface ProductReducer {
  product: Product
  status: string
  error: any
}

export interface ProductsReducer {
  products: Product[]
  status: string
  error: any
}

export interface Store {
  productReducer: ProductReducer
  productsReducer: ProductsReducer
}

export default configureStore({
  reducer: {
    cart,
    product,
    products
  }
})
