import React, { useState } from "react";
import MarkerTable from "../components/MarkerTable";

const BLANK_TRIP_FORM = {
    title: "",
    countries: "",
    description: "",
    image: "",
    address: ""
};

const BLANK_STOP_FORM = {
    title: "",
    address: ""

};

function PastForm(){
    const [formData, setFormData] = useState(BLANK_TRIP_FORM);
    const [stops, setStops] = useState (BLANK_STOP_FORM)

    function handleSubmit(event){
        event.preventDefault();
        //PROPS?
        setFormData(BLANK_FORM);
    }

    function handleChange(event){
        let { name, value } = event.target;
        setFormData (data => ({...data, [name]: value}));
    }

    function handleClick(event) {
         //props.addMarkerCb(address)    //add props to function PastForm(props)
        //  setAddress("");  //or set BLANKSTOPFORM
    }


    return (
        <form className="PastForm" onSubmit={handleSubmit}>
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
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
              <button onClick={handleClick} className="btn btn-primary">Submit</button>
          </div>

        <div className="mb-3">
            <label className="form-label">Add Picture Here</label>
            <input 
                //type="image"
                name="image"
                value={formData.description}
                onChange={handleChange}
                className="form-control" 
            />
        </div>




        <button type="submit" class="btn btn-primary">Submit</button>
        </form>



    )
}

export default PastForm;