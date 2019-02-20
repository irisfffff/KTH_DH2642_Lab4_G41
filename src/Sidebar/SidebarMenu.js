import React, { Component } from "react";

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

  render() {
    const menu = this.props.model.getFullMenu();
    const menuItems = menu.map((dish) =>
      <MenuItem key = {dish.id.toString()} dish = {dish} model={this.props.model}/>
    );

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
