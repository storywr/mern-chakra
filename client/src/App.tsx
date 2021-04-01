import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

import Home from './pages/Home'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </ChakraProvider>
)
