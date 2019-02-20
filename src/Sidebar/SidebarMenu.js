import React, { Component } from "react";

function MenuItem(props) {
  const dish = props.dish;
  return (
    <li className="row m-1 myBg border border-dark">
      <div className="col-sm brickText text-uppercase">
        {dish.name}
      </div>
      <div className="col-sm brickText text-uppercase">
        {dish.pricePerServing.toFixed(2)}
      </div>
    </li>
  );
}

class SidebarMenu extends Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    const menu = this.props.menu;
    const menuItems = menu.map((dish) =>
      <MenuItem key = {dish.id.toString()} dish = {dish} />
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
        <h5 className="text-right m-2 brickText">SEK 0.00</h5>
      </div>
    );
  }
}

export default SidebarMenu;
