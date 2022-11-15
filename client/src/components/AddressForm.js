import React, { useState } from "react";
import MarkerTable from "../components/MarkerTable";

// import "./AddressForm.css";

const BLANK_TRIP_FORM = {
  title: "",
  countries: "",
  description: "",
  image: ""
};

const BLANK_ADDRESS_FORM = {
  title: "",
  address: ""
};

function AddressForm(props) {
  const [formData, setFormData] = useState(BLANK_TRIP_FORM);
  const [address, setAddress] = useState (BLANK_ADDRESS_FORM)

  function handleChange(event){
    let { name, value } = event.target;
    setFormData (data => ({...data, [name]: value}));
}

  function handleChange2(event){
    let { name, value } = event.target;
    setAddress (data => ({...data, [name]: value}));
}

  function handleSubmit(event){
    event.preventDefault();
    console.log(formData);
    setFormData(BLANK_TRIP_FORM);
}

  function handleClick(event) {
    event.preventDefault()
    props.addMarkerCb(address);
    console.log(address);
    setAddress(BLANK_ADDRESS_FORM);
}


  return (
    <div className="AddressForm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
              <label className="form-label">Title</label>
              <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control" 
              />

          </div>
          <div className="mb-3">
              <label className="form-label">Countries Visited</label>
              <input 
                  type="text"
                  name="countries"
                  value={formData.countries}
                  onChange={handleChange}
                  className="form-control" 
              />
          </div>

          <div className="mb-3">
              <label className="form-label">Description</label>
              <input 
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control" 
              />
          </div>

        <div className="form-group">
          <label className="w-100"> Stops </label>
          <input
              type="text"
              className="form-control"
              name="title"
              value={address.title}
              onChange={handleChange2}
            />
            <input
              type="text"
              className="form-control"
              name="address"
              value={address.address}
              onChange={handleChange2}

            />
              <button onClick={handleClick} className="btn btn-primary">Add Stop</button>

          <div className="mapEr">
            <MarkerTable places={props.places} />
          </div>
        </div>
        <div className="mb-3">
            <label className="form-label">Add Picture Here</label>
            <input 
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-control" 
            />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>


      </form>
    </div>
  );
}

export default AddressForm;
