import React from 'react'
import {
  Button,
  Flex,
  Heading
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import ThemeSelector from './ThemeSelector'
import { useSelector } from 'react-redux'
import { selectCount } from '../features/cart/cartSlice'

const Navbar = () => {
  const history = useHistory()
  const count = useSelector(selectCount)

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      px='2rem'
      py='1rem'
    >
      <Flex
        align='center'
        mr={5}
        ml={2}
        onClick={() => history.replace('/')}
        cursor='pointer'
      >
        <Heading as='h1' size='lg'>
          Pub Shop
        </Heading>
      </Flex>

      <Flex mr='1rem' alignItems='center'>
        <ThemeSelector />
        <Button
          ml='1'
          variant='ghost'
          onClick={() => history.replace(`/my-items`)}
        >
          Cart{count > 0 && `: ${count}`}
        </Button>
        <Button
          ml='1'
          variant='ghost'
          onClick={() => history.replace(`/my-items`)}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
