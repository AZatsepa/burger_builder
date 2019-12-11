import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';
/* eslint-disable react/prefer-stateless-function */
class Modal extends Component {
  static propTypes = {
    show: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]).isRequired,
    modalClosed: PropTypes.func.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    children: React.createElement('div'),
  };

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <Aux>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
