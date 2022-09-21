import React, { useRef , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../store/mapSlice";
import "./Form.scss";

const Form = () => {
  const [dtype, setDtype] = useState("running");
  const dispatch = useDispatch();
  // const _type = useRef(null);
  const _distance = useRef(null);
  const _duration = useRef(null);
  const _cadence = useRef(null);

  let err = false;

  const options = [
    {
      label: "Running",
      value: "running",
    },
    {
      label: "Cycling",
      value: "cycling",
    },
  ];

  const reset = () => {
    localStorage.setItem('_data',JSON.stringify([]))
    dispatch(remove({}));
  };

  const checkIn = (value) => {
    return parseInt(value) > 0 ? value : (err = true);
  };


  const marker = useSelector((state)=>state.map.obj.marker)

  const set = () => {
    const type = dtype;
    const distance = checkIn(_distance.current.value);
    const duration = checkIn(_duration.current.value);
    const cadence = checkIn(_cadence.current.value);

    let date = new Date();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const message = `${type} on ${month[date.getMonth()]} ${date.getDate()}`

    if (err) console.log("not valid inputs !");

    let entries = [];

    dispatch(add({ type, distance, duration, cadence , marker , message}));

    if(distance.length > 0 && duration.length > 0 && cadence.length > 0){
      if(localStorage.getItem('_data')){
        entries = JSON.parse(localStorage.getItem('_data')) 
        entries.push({ type, distance, duration, cadence , marker , message })
        localStorage.setItem('_data',JSON.stringify(entries))
       }else{
        entries.push({ type, distance, duration, cadence , marker , message })
        localStorage.setItem('_data',JSON.stringify([{ type, distance, duration, cadence , marker , message }]))
       }
    }
  
    dispatch(add({ type, distance, duration, cadence, marker , message }));
  };
  return (
    <form className="form">
      <div className="flex">
        <div className="flex opt">
          <h2>Type</h2>{" "}
          <select onChange={e => setDtype(e.target.value)}>
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex opt">
          <h2>Distance</h2>
          <input ref={_distance} type="number" placeholder="Km" />
        </div>
      </div>
      <div className="flex">
        <div className="flex opt">
          <h2>Duration</h2>
          <input ref={_duration} type="number" placeholder="min" />
        </div>
        {dtype === "running" ? (
          <div className="flex opt">
            <h2>Cadence</h2>
            <input ref={_cadence} type="number" placeholder="step/min" />
          </div>
        ) : (
          <div className="flex opt">
            <h2>Elev Gain</h2>
            <input ref={_cadence} type="number" placeholder="meters" />
          </div>
        )}
      </div>
      <button onClick={set} className="set">
        Set
      </button>
      <button onClick={reset} className="reset">
        Reset
      </button>
    </form>
  );
};

export default Form;
