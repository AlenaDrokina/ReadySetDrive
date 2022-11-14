//import React, { useState } from "react";

const BLANK_FORM = {
    title: "",
    countries: "",
    description: "",
    image: ""
};

function NewRoadTrip(){
    const [formData, setFormData] = useState(BLANK_FORM);

    function handleSubmit(event){
        event.preventDefault();
        //PROPS?
        setFormData(BLANK_FORM);
    }

    function handleChange(event){
        let { name, value } = event.target;
        setFormData (data => ({...data, [name]: value}));
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

export default NewRoadTrip;