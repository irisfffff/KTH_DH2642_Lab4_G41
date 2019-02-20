import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import DishDetail from "../DishDetail/DishDetail"
import "./SelectDish.css";

class SelectDish extends Component {

  render() {
    return (
      <div className="SelectDish row no-gutters">

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar cookies={this.props.cookies} model={this.props.model} />
        <Route
          exact path="/search"
          render={() => <Dishes model={this.props.model} />}
        />
        <Route
          path="/search/dish/:id"
          render={(props) => <DishDetail {...props} cookies={this.props.cookies} model={this.props.model}  />}
        />
      </div>
    );
  }
}

export default SelectDish;
