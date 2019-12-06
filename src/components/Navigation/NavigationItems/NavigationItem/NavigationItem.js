import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';

const NavigationItem = ({ children, link, active }) => (
  <li className={classes.NavigationItem}>
    <a
      href={link}
      className={active ? classes.active : null}
    >
      {children}
    </a>
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
