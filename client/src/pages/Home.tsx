import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import AllProducts from './AllProducts'
import Product from './Product'
import Navbar from '../components/Navbar'

const Home = () => (
  <Flex minH='100vh' flexDirection='column'>
    <Navbar />
    <Flex mx='3rem'>
      <Switch>
        <Route exact path='/' component={AllProducts} />
        <Route exact path='/products/:id' component={Product} />
      </Switch>
    </Flex>
  </Flex>
)

export default Home
