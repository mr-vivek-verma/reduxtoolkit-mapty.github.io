import React from 'react'
import Map from '../../components/Map/Map'
import Sidebar from '../../components/Siderbar/Sidebar'

const Home = () => {
  return (
    <section className='home flex'>
    <Sidebar />
    <Map />
    </section>
  )
}

export default Home