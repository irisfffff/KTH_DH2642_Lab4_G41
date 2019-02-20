import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Confirm.css";

class Confirm extends Component {

    render() {

        let confirmList = this.props.model.getFullMenu().map((dish) =>
            <li className="list-inline-item px-2" key={dish.id}>
                <img className="img-fluid border border-dark" src={dish.image} alt={dish.title}/>
                <h6 className="price">{this.props.model.getDishPrice(dish).toFixed(2)} SEK</h6>
            </li>
        );

        return (
            <div className="Confirm">
                <div className="row p-3 border-bottom border-dark mb-2">
                    <h3 className="col-sm guests">My Dinner: {this.props.model.getNumberOfGuests()} people</h3>
                    <div className="col-sm goBack">
                        <Link to="/search">
                            <button className="btn btn-warning btn-sm">Go back and Edit dinner</button>
                        </Link>
                    </div>
                </div>
                <div className="Confirm-summary">

                    <ul className="col-sm-8 text-right list-inline w-100">
                        {confirmList}
                    </ul>

                    <div className="col-sm-4 border-left border-dark">
                        <h6>Total: <span className="price"> {this.props.model.getTotalMenuPrice()
                            .toFixed(2)} SEK</span>
                        </h6>
                    </div>

                </div>
                <hr/>
                <div className="text-center">
                    <Link to="/print">
                        <button id="printBtn" className="btn btn-warning">Print Full Recipe</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Confirm;
