import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome text-center">
        <p className="mx-auto my-5 w-50 y-25">Welcome to the dinner planner React Startup code!</p>

        <Link to="/search">
          <button className="btn btn-warning">Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
