import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, Image, SimpleGrid } from '@chakra-ui/react'
import { useHistory } from 'react-router'

import { fetchProducts } from '../features/products/productsSlice'
import { Product, Store } from '../store'
import Alert from '../components/Alert'
import Rating from '../components/Rating'

const AllProducts = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { products, status, error } = useSelector((state: Store) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (error) {
    return <Alert />
  }

  return (
    products ? (
      <SimpleGrid columns={[2, null, 3]} spacing='70px' mb='3rem'>
        {products.map((product: Product) => (
          <Box
            onClick={() => history.push(`/products/${product._id}`)}
            _hover={{
              boxShadow: '0 8px 12px -1px rgba(0, 0, 0, 0.2), 0 4px 8px -1px rgba(0, 0, 0, 0.12)'
            }}
            cursor='pointer'
            boxShadow='md'
            rounded='lg'
            borderWidth='1px'
            overflowX='wrap'
            key={product._id}
          >
            <Image
              src={product.image}
            />
            <Flex flexDirection='column' p={3}>
              <Box fontSize='md' fontWeight='semibold'>{product.name}</Box>
              <Flex mt={2} alignItems='center'>
                <Rating value={Math.ceil(product.rating)} />
                <Box ml={3}>{product.numReviews} reviews</Box>
              </Flex>
              <Box mt='2' fontSize='xl' fontWeight='bold'>${product.price}</Box>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    )
    : <>No products available</>
  )
}

export default AllProducts
