import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Print.css";

class Print extends Component {

    render() {

        let printList = this.props.model.getFullMenu().map((dish) =>
            <li className="row ml-2 mr-4 mb-3" key={dish.id}>
                <div className="col-sm-5 col-md-3">
                    <img className="img-fluid bigImage border border-dark" src={dish.image} alt={dish.title}/>
                </div>
                <div className="col-sm-7 col-md-4">
                    <h3 className="text-uppercase">{dish.title}</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                <div className="col-md-5">
                    <h5 className="text-uppercase">Preparations</h5>
                    <span>{dish.instructions}</span>
                </div>

            </li>
        );

        return (
            <div className="Print">
                <div className="row p-3 border-bottom border-dark mb-2">
                    <h3 className="col-sm guests">My Dinner: {this.props.model.getNumberOfGuests()} people</h3>
                    <div className="col-sm goBack">
                        <Link to="/search">
                            <button className="btn btn-warning btn-sm">Go back and Edit dinner</button>
                        </Link>
                    </div>
                </div>

                <ul className="list-unstyled w-100 my-4">
                    {printList}
                </ul>
            </div>
        );
    }

}

export default Print;
