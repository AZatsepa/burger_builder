import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((result, el) => (
        result + el
      ), 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = totalPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuehandler = () => {
    alert('You continue!'); // eslint-disable-line no-alert
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
    } = this.state;
    const disabledInfo = {
      ...ingredients,
    };

    Object.keys(disabledInfo).forEach((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinuehandler}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
          price={totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;