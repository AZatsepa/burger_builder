import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.module.css';

const DrawerToggle = ({ clicked }) => (
  <div
    className={classes.DrawerToggle}
    onClick={clicked}
    role="button"
    tabIndex="0"
    label="Toggle drawer"
  >
    <div />
    <div />
    <div />
  </div>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
