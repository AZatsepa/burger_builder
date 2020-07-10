import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  loading: false,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(
    state.ingredients,
    { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 },
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredients = updateObject(
    state.ingredients,
    { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 },
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => ({
  ...state,
  ingredients: action.ingredients,
  totalPrice: 4,
  error: false,
  building: false,
});

const setIngredientsfailed = (state) => updateObject(state, { error: true });

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.SET_INGREDIENTS_FAILED: return setIngredientsfailed(state);
    default: return state;
  }
};

export default burgerBuilder;
