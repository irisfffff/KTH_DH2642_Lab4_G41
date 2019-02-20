import React, {Component} from "react";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {status: "LOADING", dish: null};
        this.addDishToMenu = this.addDishToMenu.bind(this);
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    componentDidMount() {
        this.props.model.addObserver(this);
        const { id } = this.props.match.params;

        this.props.model.getDish(id)
            .then(dish => {
                this.setState({
                    status: "LOADED",
                    dish : dish
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                    dish : null
                });
            });

    }

    update(){
        console.log("ay");
        this.forceUpdate();
    }

    addDishToMenu(){
        this.props.model.addDishToMenu(this.state.dish);
        let menu = this.props.model.getFullMenu();
        let menuId = [];
        menu.map((dish) => menuId.push(dish.id));
        const { cookies } = this.props;
        cookies.set("menu", menuId, { path: "/", maxAge: 30 });
    }

    render() {

        switch (this.state.status) {
            case "LOADING":
                return (<Loader/>);
            case "ERROR":
                return (
                    <div>
                        <b>Failed to load data, please try again</b>
                            <Link to="/search">
                                <button className="btn btn-warning btn-sm my-3">Back to search</button>
                            </Link>
                        </div>
            );
            case "LOADED":
                const dish = this.state.dish;

                let pricePerServing =  dish["pricePerServing"] ?
                    <p> Price per Serving:  {dish["pricePerServing"]} SEK</p> : "";


                let ingredientList = dish["extendedIngredients"].map((ingredient) =>
                    <li className="row" key={ingredient.name}>
                        <span className="col-2">{ingredient.amount + " " + ingredient.unit}</span>
                        <span className="col-6">{ingredient.name}</span>
                        <span className="col-2">SEK</span>
                        <span className="col-2">{(1 * this.props.model.getNumberOfGuests())
                            .toFixed(2)}</span>
                    </li>
                );

                return (
                    <div className="DishDetail col-md-10">

                        <div className="row">
                            <div className="col-sm px-4 py-2">
                                <h2 className="text-uppercase">{dish.title}</h2>
                                <img alt="dish-img" className="img-fluid bigImage" src={dish.image} />
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link to="/search">
                                    <button className="btn btn-warning btn-sm my-3">Back to search</button>
                                </Link>

                                <h3 className="text-uppercase">Preparation</h3>
                                <p>{dish["instructions"]}</p>
                            </div>

                            <div className="col-sm">
                                <div className="border border-dark p-3">
                                    <h4 className="text-uppercase">
                                        Ingredients for <span>{this.props.model.getNumberOfGuests()}</span> people
                                    </h4>F

                                    <hr/>
                                    <ul><em>Ingredients list</em>
                                        {ingredientList}
                                    </ul>

                                    {pricePerServing}

                                    <hr/>
                                    <div className="box">
                                        <button className="btn btn-warning btn-sm" onClick={this.addDishToMenu}>
                                            Add to menu
                                        </button>
                                        <h6>SEK {this.props.model.getDishPrice(dish).toFixed(2)}</h6>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div> );
            default:
                return (<p> ??? </p>)
        }

    }
}

export default DishDetail;
