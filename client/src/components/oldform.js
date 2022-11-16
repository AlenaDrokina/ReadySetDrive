import React, { useState } from "react";
import MarkerTable from "../components/MarkerTable";

// import "./AddressForm.css";

const BLANK_TRIP_FORM = {
  title: "",
  countries: "",
  description: "",
  stops: [],
  newStop: {title: "", address: ""},
  image_url: "",
  done: 1,
  user_id: 1        //debug only, remove after auth is done!!
};

const BLANK_ADDRESS_FORM = {
  title: "",
  address: ""
};

function AddressForm(props) {
  const [formData, setFormData] = useState(BLANK_TRIP_FORM);
  const [address, setAddress] = useState (BLANK_ADDRESS_FORM);

function handleChange(event){
    let { name, value } = event.target;
    setFormData (data => ({...data, [name]: value}));
}

function handleStopChange(event) {
    let {name, value} = event.target
    setAddress(data => ({...data, [name]: value}));
}


  function handleSubmit(event){
    event.preventDefault();
    props.addRoadtripCb(formData);
    BLANK_TRIP_FORM.stops = [];
    console.log(formData);
    setFormData(BLANK_TRIP_FORM);
}



function delStop(name) {
  let ix = Number(name.slice(5));  // get index of stop to delete, why 5 from demo?
  let newFormData = {...formData};
  newFormData.stops.splice(ix, 1);  // delete
  console.log("del", newFormData);
                                            //not actually deleting from db
  setFormData(formData => newFormData);
}

function addStop(event) {
  let newFormData = {...formData};
  //console.log("new", newFormData);
  newFormData.stops.push(address);
  props.addMarkerCb(address);                      
  newFormData.newStop = '';  // reset 'newStop' field
  setFormData(formData => newFormData);
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
          <label className="w-100"> Stops 
          {/* {   
              formData.stops.map((f, ix) => (
                <div key= {ix} className="stops">
                  <input
                    type= "text"
                    name={'stops-'+ix}
                    value={formData.stops[ix].title}
                    onChange={handleChange}
                />
                <button type="button" onClick={e => delStop('stops-'+ix)}>del</button>
                </div>
              ))
          } */}

          {/* Field to add a new stop */}
          <div className="stops">
              <input
                  type="text"
                  name="title"
                  value={address.title}
                  onChange={handleStopChange}
              />
              <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleStopChange}
              />

              <button type="button" onClick={addStop}>add</button>
          </div>
          </label>

          <div className="mapEr">
            <MarkerTable places={props.places} delStop={name => delStop(name)}/>
          </div>
        </div>
        <div className="mb-3">
            <label className="form-label">Add Picture Here</label>
            <input 
                type="text"
                name="image_url"
                value={formData.image_url}
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
