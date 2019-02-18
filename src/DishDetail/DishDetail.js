import React, { Component } from "react";
import { Link } from "react-router-dom";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="DishDetail col-md-10">
        <h1>This is dish detail screen</h1>
        <div className="row">
          <div className="col-sm px-4 py-2" >
            <h2 className="text-uppercase">Dish Name</h2>
            <img alt="dish-img" className="img-fluid bigImage" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.</p>
            <Link to="/search">
              <button className="btn btn-warning btn-sm my-3">Back to search</button>
            </Link>
            <h3 className="text-uppercase">Preparation</h3>
            <p>Dish Preparation</p>
          </div>

          <div className="col-sm">
            <div className="border border-dark p-3">
              <h4 className="text-uppercase">
                  Ingredients for <span>4</span> people
              </h4>

              <hr /><ul><em>Ingredients list</em></ul><hr />
              <div className="box">
                  <button className="btn btn-warning btn-sm">Add to menu</button>
                  <h6>SEK 0.00</h6>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default DishDetail;
