import React,{useEffect} from 'react'
import { Provider } from 'react-redux'
import Home from './pages/Home/Home'
import store from './store/store'
import './App.scss'

const App = () => {
  // useEffect(() => {
  //   localStorage.setItem('_data', JSON.stringify([]));
  // }, [])
  return (
    <Provider store={store}>
        <Home />
    </Provider>
  )
}

export default App