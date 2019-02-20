import React, { Component } from "react";
import Loader from "../Loader/Loader";

function MenuItem(props) {
  const dish = props.dish;
  return (
    <li className="row m-1 myBg border border-dark">
      <div className="col-sm brickText text-uppercase">
        {dish.title}
      </div>
      <div className="col-sm brickText text-right">
        {props.model.getDishPrice(dish).toFixed(2)}
      </div>
    </li>
  );



}

class SidebarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {status: "LOADING"};
  }

  componentDidMount() {
    const { cookies } = this.props;
    let menu = cookies.get("menu");
    if(menu !== undefined) {
      console.log(menu);
      Promise.all(menu.map(dishId => this.props.model.getDish(dishId))).then(dishes => {
          dishes.forEach(dish => this.props.model.addDishToMenu(dish));
          this.setState({
              status: "LOADED"
          });
      });
    }
    else {
      this.setState({
        status: "LOADED"
      });
    }
  }

  render() {

    let menuItems = null;

    switch (this.state.status) {
      case "LOADING":
        menuItems = <Loader/>;
        break;
      case "LOADED":
        const menu = this.props.model.getFullMenu();
        menuItems = menu.map((dish) =>
          <MenuItem key = {dish.id.toString()} dish = {dish} model={this.props.model}/>
        );
        break;
      default:
        menuItems = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="SidebarMenu">
        <div className="myBg my-1 small px-2 box">
          <span>Dish Name</span>
          <span>Cost</span>
        </div>
        <ul className="list-unstyled mt-1 mb-3">
          {menuItems}
        </ul>
        <h5 className="text-right m-2 brickText">SEK {this.props.model.getTotalMenuPrice().toFixed(2)}</h5>
      </div>
    );
  }
}

export default SidebarMenu;
