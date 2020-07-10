import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact active>Burger Builder</NavigationItem>
    { isAuthenticated ? <NavigationItem link="/orders" active={false}>Orders</NavigationItem> : null }
    { isAuthenticated ?
      <NavigationItem link="/logout" active={false}>Logout</NavigationItem> :
      <NavigationItem link="/auth" active={false}>Authenticate</NavigationItem> }
  </ul>
);

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavigationItems;
