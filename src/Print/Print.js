import React, { Component } from "react";
import { Link } from "react-router-dom";

class Print extends Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div className="Print">
        <h2>This is the Print Screen</h2>
        <div className="row p-3 border-bottom border-dark mb-2">
          <h3 className="col-sm guests">My Dinner: 4 people</h3>
          <div className="col-sm goBack">
            <Link to="/search">
              <button className="btn btn-warning btn-sm">Go back and Edit dinner</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

}

export default Print;
