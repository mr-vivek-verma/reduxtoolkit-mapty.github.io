import React from 'react';
import './Task.scss';
import { FaRunning } from 'react-icons/fa';
import { BiCycling } from 'react-icons/bi';
import { BsClockHistory , BsLightningCharge } from 'react-icons/bs';
import { GiFootprint , GiMountainRoad } from 'react-icons/gi';

let date = new Date()

const Task = ({ty,di,du,ca}) => {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <div style={{borderLeft: `5px solid ${ty === "cycling" ? "orange" : "green"}`}} className='task'>
    <h1 className='title'>{ty} on {month[date.getMonth()]} {date.getDate()}</h1>
    <div className="flex-between">
        <span className="flex"><span>{ty === "cycling" ? <BiCycling /> : <FaRunning />}</span>{di}<span className='unit'>{"KM"}</span></span>
        <span className="flex"><span><BsClockHistory /></span>{du}<span className='unit'>{"MIN"}</span></span>
        <span className="flex"><span><BsLightningCharge /></span>{ty === "cycling" ? "60" : "1.0"}<span className='unit'>{ty === "cycling" ? "KM/H" : "MIN/KM"}</span></span>
        <span className="flex"><span>{ty === "cycling" ? <GiMountainRoad /> : <GiFootprint />}</span>{ca}<span className='unit'>{ty === "cycling" ? "KM/H" : "MIN/KM"}</span></span>
    </div>
    </div>
  )
}

export default Task