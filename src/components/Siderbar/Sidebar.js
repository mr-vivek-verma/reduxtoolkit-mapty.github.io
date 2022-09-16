import React from 'react';
import './Sidebar.scss'
import logo from '../../assets/logo.png'
import Form from '../Form/Form';
import { useSelector } from 'react-redux';
import Task from '../Task/Task';

const Sidebar = () => {
  const status = useSelector((state)=>state.map.status)
  const _data = useSelector((state)=>state.map.data)

  return (
    <div className="sidebar flex column">
        <img className='logo' src={logo} alt="logo" />
        {status ? <Form /> : ""}
        {_data.map((data,i) => <Task key={i} ty={data.type} di={data.distance} du={data.duration} ca={data.cadence} />)}
    </div>
  )
}

export default Sidebar