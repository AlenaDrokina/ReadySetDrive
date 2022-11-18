import React, { useState } from "react";
import "./RoadtripForm.css";


const BLANK_TRIP_FORM = {
  title: "",
  countries: "",
  description: "",
  image_url: "",
  done: 1,
  user_id: 1        //debug only, remove after auth is done!!
};


function RoadtripForm(props) {
  const [formData, setFormData] = useState(BLANK_TRIP_FORM);

  function handleChange(event){
    let { name, value } = event.target;
    setFormData (data => ({...data, [name]: value}));
}

  function handleSubmit(event){
    event.preventDefault();
    props.addRoadtripCb(formData);
    console.log(formData);
    setFormData(BLANK_TRIP_FORM);
}

  return (
    <div className="RoadtripForm"> 
      {/* <h1>Create Your Roadtrip </h1> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
              <label className="form-label1">Title</label>
              <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control" 
              />

          </div>
          <div className="mb-3">
              <label className="form-label2">Countries Visited</label>
              <input 
                  type="text"
                  name="countries"
                  value={formData.countries}
                  onChange={handleChange}
                  className="form-control" 
              />
          </div>

          <div className="mb-3">
              <label className="form-label3">Description</label>
                <textarea
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                />
          </div>

        <div className="mb-3">
            <label className="form-label">Add Picture URL</label>
            <input 
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="form-control" 
            />
        </div>

        <button type="submit" className="btn btn-primary">Submit </button>

      </form>
    </div>
  );
}

export default RoadtripForm;