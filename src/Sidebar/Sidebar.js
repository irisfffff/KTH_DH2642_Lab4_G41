import React, { Component } from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    let numberOfGuests = cookies.get("numberOfGuests");
    if(numberOfGuests !== undefined) {
      this.state = {
        numberOfGuests: numberOfGuests
      };
      this.props.model.setNumberOfGuests(numberOfGuests);
    }
    else {
      this.state = {
        numberOfGuests: this.props.model.getNumberOfGuests()
      };
    }

  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    const { cookies } = this.props;

    cookies.set("numberOfGuests", e.target.value, { path: "/" });
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div className="Sidebar col-md-2 border border-dark py-2">
        <div className="form-group row">
          <label className="col-sm col-form-label m-2">People:</label>
          <div className="col-sm col-form-label m-2">
            <input
              className="form-control"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.onNumberOfGuestsChanged}
            />
          </div>
          <br />
        </div>
        <SidebarMenu cookies={this.props.cookies} model={this.props.model} />
        {/*Link to Confirm Screen*/}
        <Link to="/confirm">
          <div className="text-center">
            <button className="btn btn-warning">Confirm Dinner</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default Sidebar;
