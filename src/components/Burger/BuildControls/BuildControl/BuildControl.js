import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.module.css';

const BuildControl = ({
  label,
  added,
  removed,
  disabled,
}) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button className={classes.Less} onClick={removed} type="button" disabled={disabled}>Less</button>
    <button className={classes.More} onClick={added} type="button">More</button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default BuildControl;
