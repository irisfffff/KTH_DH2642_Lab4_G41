import React, { Component } from "react";


class DishItem extends Component {

    /*constructor(props) {
        super(props);
    }*/

    render() {
        return (
            <a id={this.props.dish.id}
               className="btn wrapper myBg border border-dark mx-4 my-4"
               onClick={this.props.clickHandler}>

                <img alt={this.props.dish.title} className="border-bottom border-dark"
                     src={this.props.model.constructor.IMAGE_URL + this.props.dish.imageUrls} />

                <div className="text-truncate">
                    {this.props.dish.title}
                </div>
            </a>
        );
    }
}

export default DishItem;
