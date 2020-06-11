import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
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
    // this.setState({ loading: true });
    // const { ingredients, totalPrice: price } = this.state;
    // const order = {
    //   ingredients,
    //   price,
    //   customer: {
    //     name: 'Donets',
    //     address: {
    //       street: 'Testsrteet 1',
    //       zipCode: '12345',
    //       country: 'Ukraine',
    //     },
    //     email: 'test@test.com',
    //   },
    //   deliveryMethod: 'fastest',
    // };
    // axios.post('/orders.json', order)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error))
    //   .finally(() => this.setState({ loading: false, purchasing: false }));
    const { history } = this.props;
    const { ingredients } = this.state;
    const queryParams = [];
    Object.keys(ingredients).forEach((key) => {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}`);
    });
    const queryString = queryParams.join('&');
    history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error,
    } = this.state;
    const disabledInfo = {
      ...ingredients,
    };

    Object.keys(disabledInfo).forEach((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    let orderSummary = null;

    let burger = error ? <p>Ingredients can&apos;t be loaded!</p> : <Spinner />;

    if (ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuehandler}
        />
      );
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
