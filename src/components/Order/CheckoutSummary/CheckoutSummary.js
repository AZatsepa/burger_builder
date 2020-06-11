import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={ingredients} />
    </div>
    <Button
      btnType="Danger"
      clicked={checkoutCancelled}
    >
        CANCEL
    </Button>
    <Button
      btnType="Success"
      clicked={checkoutContinued}
    >
        CONTINUE
    </Button>
  </div>
);

CheckoutSummary.propTypes = {
  ingredients: PropTypes.shape({
  }).isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
