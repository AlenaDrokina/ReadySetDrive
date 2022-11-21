import React, { useState } from "react";
import {useParams} from "react-router-dom";
import Api from "../helpers/Api";
import "./StopsForm.css"


const BLANK_ADDRESS_FORM = {
    title: "",
    address: "",
  };


function StopsForm(props){
  let {id} = useParams();

  const [address, setAddress] = useState (BLANK_ADDRESS_FORM)

  function handleChange2(event){
    let { name, value } = event.target;
    setAddress (data => ({...data, [name]: value}));
}

  function handleSubmit(event) {
    event.preventDefault()
    props.addMarkerCb(address);
    setAddress(BLANK_ADDRESS_FORM);
}


return (
<div className="StopsForm" > 
    <h1> Add Your Stops </h1>
    <form onSubmit={handleSubmit}> 
      <div className="mb-3"> 
            <label className="form-label">Stop Name</label>
            <input
            type="text"
            className="form-control"
            name="title"
            value={address.title}
            onChange={handleChange2}
            />
      </div>

        <div className="mb-3">
            <label className="form-label">Address</label>
            <input
            type="text"
            className="form-control"
            name="address"
            value={address.address}
            onChange={handleChange2}
            />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Stop</button>

        {/* <div className="mb-3 form-check">
              <input 
              type="checkbox" 
              className="form-check-input" 
              id="exampleCheck1"
              onClick={() => markComplete()}
              />
            <label class="form-check-label" for="exampleCheck1">Mark here if your trip is completed</label>
        </div> */}

    </form>
</div>

)
};
export default StopsForm;