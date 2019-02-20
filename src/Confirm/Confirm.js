import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Confirm.css";

class Confirm extends Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div className="Confirm">
        <div className="row p-3 border-bottom border-dark mb-2">
          <h3 className="col-sm guests">My Dinner: 4 people</h3>
          <div className="col-sm goBack">
            <Link to="/search">
              <button className="btn btn-warning btn-sm">Go back and Edit dinner</button>
            </Link>
          </div>
        </div>
        <div className="Confirm-summary">
        </div>
        <hr/>
        <div className="text-center">
          <Link to="/print">
            <button id="printBtn" className="btn btn-warning">Print Full Recipe</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Confirm;
