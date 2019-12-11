import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Layout.module.css';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState(({ oldShowSideDrawerState }) => (
      { showSideDrawer: !oldShowSideDrawerState }
    ));
  }

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
