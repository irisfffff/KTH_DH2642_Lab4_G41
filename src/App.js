import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Confirm from "./Confirm/Confirm";
import Print from "./Print/Print";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header myBg text-center pb-3 pt-3">
          <h1 className="App-title">{this.state.title}</h1>
        </header>

        {/* We rended diffrent component based on the path */}
        <Route exact path="/" component={Welcome} />
        <Route
          path="/search"
          render={() => <SelectDish model={modelInstance} />}
        />
        <Route
          path="/confirm"
          render={() => <Confirm model={modelInstance} />}
        />
        <Route
          path="/print"
          render={() => <Print model={modelInstance} />}
        />
      </div>
    );
  }
}

export default App;
