import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.css';

const Backdrop = ({ show, clicked }) => (
  show ? <div className={classes.Backdrop} onClick={clicked} role="button" tabIndex="0" label="Dismiss" /> : null
);


Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
