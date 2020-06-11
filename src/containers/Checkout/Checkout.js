import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    const query = new URLSearchParams(search);
    const ingredients = {};
    query.forEach((value, key) => {
      ingredients[key] = +value;
    });
    this.setState({ ingredients });
  }

  render() {
    const { ingredients } = this.state;
    const { match: { path } } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;
