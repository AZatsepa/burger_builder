import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const SideDrawer = ({ open, closed, isAuth }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')} onClick={closed} role="toolbar">
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

SideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default SideDrawer;
