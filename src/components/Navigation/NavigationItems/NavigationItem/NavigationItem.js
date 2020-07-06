import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = ({ children, link, active, exact }) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={link}
      exact={exact}
      activeClassName={active ? classes.active : null}
    >{children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

NavigationItem.defaultProps = {
  children: '',
};

export default NavigationItem;
