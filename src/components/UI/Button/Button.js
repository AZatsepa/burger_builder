import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({ clicked, btnType, type, disabled, children }) => (
  <button
    type={type || "button"}
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func,
  btnType: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: React.createElement('div'),
};

export default Button;
