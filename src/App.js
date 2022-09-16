import React from 'react'
import { Provider } from 'react-redux'
import Home from './pages/Home/Home'
import store from './store/store'
import './App.scss'

const App = () => {
  return (
    <Provider store={store}>
        <Home />
    </Provider>
  )
}

export default App