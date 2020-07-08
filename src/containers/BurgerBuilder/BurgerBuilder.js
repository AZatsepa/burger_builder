import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  updatePurchaseState = () => {
    const { ingredients } = this.props;
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((result, el) => (
        result + el
      ), 0);
    return (sum > 0);
  }


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { onInitPurchase, history } = this.props;
    onInitPurchase();
    history.push('/checkout');
  };

  render() {
    const {
      purchasing,
    } = this.state;
    const {
      ingredients, totalPrice, loading, error,
    } = this.props;
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
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
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
          purchaseContinued={this.purchaseContinueHandler}
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

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.burgerBuilder.loading,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
