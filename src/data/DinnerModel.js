import ObservableModel from "./ObservableModel";
import API_KEY from "../API";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/41";
const httpOptions = {
  headers: {
    "X-Mashape-Key": API_KEY
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this._menu = [{
      'id': 1,
      'name': 'French toast',
      'type': 'starter',
      'image': 'toast.jpg',
      'pricePerServing': 11,
      'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
      'ingredients': [{
        'name': 'eggs',
        'quantity': 0.5,
        'unit': '',
        'price': 10
      }, {
        'name': 'milk',
        'quantity': 30,
        'unit': 'ml',
        'price': 6
      }, {
        'name': 'brown sugar',
        'quantity': 7,
        'unit': 'g',
        'price': 1
      }, {
        'name': 'ground nutmeg',
        'quantity': 0.5,
        'unit': 'g',
        'price': 12
      }, {
        'name': 'white bread',
        'quantity': 2,
        'unit': 'slices',
        'price': 2
      }]
    }];
    this._selectedDishId = -1;
    this._selectedDish = {};
    this.getNumberOfGuests();
  }

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

  /**
   * Get selected dish id
   * @returns {number}
   */
  getSelectedDishId() {
    return this._selectedDishId;
  }

  /**
   * Set selected dish id
   * @param {number} num
   */
  setSelectedDishId(num) {
    this._selectedDishId = num;
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

  addDishToMenu() {
    this.removeDishFromMenu(this._selectedDish.id);
    this._menu.push(this._selectedDish);
    this.notifyObservers();
  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    let index = this._menu.map(function(e) {
      return e.id;
    }).indexOf(id);
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
    const url = `${BASE_URL}/recipes/search`;
    let searchUrl = new URL(url);
    searchUrl.search = new URLSearchParams(params).toString();
    return fetch(searchUrl.toString(), httpOptions)
      .then(this.processResponse)
      .catch(error => {
        return new Promise(resolve => resolve({'error': error}));
      });
  }

  /**
   * Do an API call for a specific recipe.
   * @returns {Promise<any>}
   */
  getDish(id) {
    const url = `${BASE_URL}/recipes/${id}/information`;
    return fetch(url, httpOptions)
      .then(this.processResponse)
      .catch(error => {
        return new Promise(resolve => resolve({'error': error}));
      });
  }

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
