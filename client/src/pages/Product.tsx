import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Grid,
  Spinner,
  Select,
  GridItem,
  Button
} from '@chakra-ui/react'

import Alert from '../components/Alert'
import Rating from '../components/Rating'
import { fetchProduct } from '../features/products/productSlice'
import { add, update, selectItemById } from '../features/cart/cartSlice'
import { Store } from '../store'

const Product = () => {
  const history = useHistory()
  const { id }: any = useParams()
  const dispatch = useDispatch()
  const { product, status, error } = useSelector((state: Store) => state.product)
  const productInCart = useSelector(selectItemById(id))
  const [qty, setQty] = useState(productInCart ? productInCart.qty : 0)

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [dispatch])

  if (error) {
    return <Alert />
  }

  const addToCart = () => {
    dispatch(add({ product, qty: parseInt(qty) }))
  }

  const updateCart = () => {
    dispatch(update({ product, qty: parseInt(qty) }))
  }

  return (
    product ?
      <Box>
        <Button
          mb={6}
          onClick={() => history.replace('/')}
        >
          Go Back
        </Button>
        <Grid templateColumns='repeat(4, 1fr)' gap={12}>
          <GridItem colSpan={2}>
            <Image src={product.image} />
          </GridItem>
          <GridItem colSpan={1}>
            <Box width='300px'>
              <Heading size='lg'>{product.name}</Heading>
              <Divider mt={3} mb={3} />
              <Flex alignItems='center'>
                <Rating value={Math.ceil(product.rating)} />
                <Box fontWeight='semibold' ml={3}>{product.numReviews} reviews</Box>
              </Flex>
              <Divider mt={3} mb={3} />
              <Box
                fontSize='xl'
                fontWeight='bold'
              >
                ${product.price}
              </Box>
              <Divider mt={3} mb={3} />
              <Box
                fontSize='lg'
                fontWeight='semibold'
              >
                Description: {product.description}
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box w='225px' fontSize='xl'>
              <Flex p={4} borderBottom='none' borderWidth='1px' justifyContent='space-between'>
                <Box>Price:</Box>
                <Box>${product.price}</Box>
              </Flex>
              <Flex p={4} borderBottom='none' borderWidth='1px' justifyContent='space-between'>
                <Box>Status:</Box>
                <Box>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Box>
              </Flex>
              {product.countInStock > 0 && (
                <Box p={4} borderWidth='1px' borderBottom='none'>
                  <Select
                    value={qty}
                    placeholder='Select Quantity'
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </Select>
                </Box>
              )}
              <Box p={4} borderWidth='1px'>
                {productInCart ?
                  <Button
                    w='100%'
                    onClick={updateCart}
                    disabled={qty == productInCart.qty}
                  >
                    Update Cart
                  </Button>
                :
                  <Button
                    w='100%'
                    onClick={addToCart}
                    disabled={qty === 0}
                  >
                    Add to Cart
                  </Button>
                }
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    : <Spinner size='lg' />
  )
}

export default Product
