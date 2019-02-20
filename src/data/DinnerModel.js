import ObservableModel from "./ObservableModel";
import API_KEY from "../API";

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this._menu = [];
  }

  static BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/41";
  static IMAGE_URL = "https://spoonacular.com/recipeImages/";
  static HTTP_OPTIONS = {
        headers: {
            "X-Mashape-Key": API_KEY
        }
    };


    /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  getFullMenu() {
    return this._menu;
  }

  getDishPrice(dish) {
    if (typeof(dish.pricePerServing) !== 'undefined')
      return dish.pricePerServing * this._numberOfGuests;
    else {
      return dish.extendedIngredients.length * this._numberOfGuests;
    }
  }

  getTotalMenuPrice() {
    let price = 0;
    for (let key in this._menu) {
      if (typeof(this._menu[key].pricePerServing) !== 'undefined')
        price += this._menu[key].pricePerServing;
      else {
        price += this._menu[key].extendedIngredients.length;
      }
    }
    return price * this._numberOfGuests;
  }

  addDishToMenu(dish) {
    this.removeDishFromMenu(dish);
    this._menu.push(dish);
    this.notifyObservers();
  }

  //Removes dish from menu
  removeDishFromMenu(dish) {
    let index = this._menu.findIndex(el => el.id === dish.id);
    if (index !== -1)
      this._menu.splice(index, 1);
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * Search dishes with filter
   * @returns {Promise<any>}
   */
  getAllDishes(params) {
    const url = `${DinnerModel.BASE_URL}/recipes/search`;
    let searchUrl = new URL(url);
    searchUrl.search = new URLSearchParams(params).toString();
    return fetch(searchUrl.toString(), DinnerModel.HTTP_OPTIONS).then(this.processResponse)
        .then(response => {
            if(response.results)
                return response.results;
            else
                throw Error("No results field in the body");
        }
    );
  }

  /**
   * Do an API call for a specific refipe.
   * @returns {Promise<any>}
   */
  getDish(id) {
    const url = `${DinnerModel.BASE_URL}/recipes/${id}/information`;
    return fetch(url, DinnerModel.HTTP_OPTIONS).then(this.processResponse);
  };

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response.statusText;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
