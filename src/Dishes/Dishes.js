import React, { Component } from "react";
import { Redirect } from "react-router";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";

const BASE_URL = "https://spoonacular.com/recipeImages/";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDishSelect = this.handleDishSelect.bind(this);

    this._dishTypes = [
        "main course", "side dish", "dessert", "appetizer", "salad",
        "bread", "breakfast", "soup", "beverage", "sauce", "drink"
    ];
    this._selectedDishId = -1;
    this._filter = {type: "", query: ""};
    this.state = {status: "LOADING", toDishDetail: false};
  }

  updateDishItems() {
    modelInstance
      .getAllDishes(this._filter)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.updateDishItems();
  }

  // when searching parameters are changed
  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    this._filter.type = form.elements["type"].value;
    this._filter.query = form.elements["query"].value;
    this.setState({status: "LOADING"});
    this.updateDishItems();
  }

  handleDishSelect(event) {
    event.preventDefault();
    if(event.target.tagName == "A") {
      this._selectedDishId = event.target.id;
    }
    else {
        this._selectedDishId = event.target.parentNode.id;
    }
      this.props.model.setSelectedDishId(this._selectedDishId);
    this.setState({toDishDetail: true});
  }

  render() {
    if(this.state.toDishDetail === true) {
      return <Redirect to={'/search/recipe/' + this._selectedDishId} />
    }

    let dishTypes = [];
    for(let i = 0; i < this._dishTypes.length; i++) {
      dishTypes.push(<option value={this._dishTypes[i]}>{this._dishTypes[i]}</option>);
    }

    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        let listItems = this.state.dishes.map(dish => (
          <a id={dish.id} className="btn wrapper myBg border border-dark mx-4 my-4" onClick={this.handleDishSelect}>
            <img className="border-bottom border-dark" src={BASE_URL + dish.imageUrls} />
            <div className="text-truncate">
              {dish.title}
            </div>
          </a>
        ));
        dishesList = <div className="d-flex flex-wrap">{listItems}</div>;
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes col-md-10 py-2 px-4">
        <h5>FIND A DISH</h5>
        <form className="form-inline" onSubmit={this.handleSubmit}>
            <input name="query" type="text" className="form-control col-sm-3 mx-2 border border-secondary"
                   placeholder="Enter key words"/>
            <select name="type" className="form-control col-sm-3 mx-2 border border-secondary" title="Select a dish type">
                <option value="">all</option>
                {dishTypes}
            </select>
            <button className="col-sm-2 btn btn-warning mx-2">Search</button>
        </form>
        <ul>{dishesList}</ul>
      </div>
    );
  }
}

export default Dishes;
