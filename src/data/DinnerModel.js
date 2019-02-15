import ObservableModel from "./ObservableModel";

const BASE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
const httpOptions = {
  headers: {
    "X-Mashape-Key": "YOUR_API_KEY"
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this._menu = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
    'pricePerServing':11,
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		}];
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

  getFullMenu() {
    return this._menu;
  }

  addDishToMenu() {
    //this.removeDishFromMenu(selectedDish.id);
    //this._menu.push(selectedDish);
    this.notifyObservers();
  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    let index = this._menu.map(function(e) {
      return e.id;
    }).indexOf(id);
    if (index != -1)
      this._menu.splice(index, 1);
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
