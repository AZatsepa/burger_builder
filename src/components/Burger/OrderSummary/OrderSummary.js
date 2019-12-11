import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  static propTypes = {
    ingredients: PropTypes.shape({
      salad: PropTypes.number.isRequired,
      cheese: PropTypes.number.isRequired,
      meat: PropTypes.number.isRequired,
      bacon: PropTypes.number.isRequired,
    }).isRequired,
    purchaseCancelled: PropTypes.func.isRequired,
    purchaseContinued: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
  }

  componentDidUpdate() {
    console.log('OrderSummary DidUpdate');
  }

  render() {
    const {
      price,
      purchaseCancelled,
      purchaseContinued,
      ingredients,
    } = this.props;
    const ingredientSummary = Object.keys(ingredients)
      .map((key) => (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span>: {ingredients[key]}
        </li>
      ));

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
