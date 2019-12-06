import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({ clicked, btnType, children }) => (
  <button
    type="button"
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func.isRequired,
  btnType: PropTypes.string.isRequired,
};

Button.defaultProps = {
  children: React.createElement('div'),
};

export default Button;
