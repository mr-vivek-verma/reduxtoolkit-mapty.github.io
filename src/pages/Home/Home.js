import React from 'react'
import MapBox from '../../components/MapBox/MapBox'
import Sidebar from '../../components/Siderbar/Sidebar'

const Home = () => {
  return (
    <section className='home flex'>
    <Sidebar />
    <MapBox />
    </section>
  )
}

export default Home