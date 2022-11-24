import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import "./LogoutView.css";

function LogoutView() {
  return (
    <div className="LogoutView">

        <h1>
            Uh-oh...  <br />
            Your trip has ended!  <br />
        </h1>
        <a href="/">
          <BsArrowLeftCircle className="arrow-icon" />
          {" "}
          Let's Go Back
        </a>


      <div className="logoutgif">
        <img
          //src="https://giphy.com/embed/10i60xHdqVuIKc"
          src="https://media.tenor.com/jC7QQSIYkm4AAAAd/buster-keaton-silent-movie.gif"
        />
        </div>


    
</div>
  );
}

export default LogoutView;
