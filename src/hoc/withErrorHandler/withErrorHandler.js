import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => (
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: false,
      };

      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: false });
        return request;
      });
      this.respInterceptor = axios.interceptors.response.use((res) => res, (error) => {
        this.setState({ error });
      });
    }

    componentWillUnmount() {
      console.log('Will Unmount', this.reqInterceptor, this.respInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      const { error } = this.state;
      return (
        <Aux>
          <Modal
            show={error}
            clicked={this.errorConfirmedHandler}
            modalClosed={this.errorConfirmedHandler}
          >
            {error ? error.message : <div />}
          </Modal>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
);

export default withErrorHandler;
