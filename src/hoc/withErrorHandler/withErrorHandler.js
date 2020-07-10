import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => class extends Component {
        state = {
          error: false,
        }

        componentWillMount() {
          this.reqInterceptor = axios.interceptors.request.use((req) => {
            this.setState({ error: false });
            return req;
          });
          this.resInterceptor = axios.interceptors.response.use((res) => res, (error) => {
            this.setState({ error });
          });
        }

        componentWillUnmount() {
          axios.interceptors.request.eject(this.reqInterceptor);
          axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
          this.setState({ error: false });
        }

        render() {
          return (
            <Aux>
              <Modal
                show={this.state.error}
                modalClosed={this.errorConfirmedHandler}
              >
                {this.state.error ? this.state.error.message : null}
              </Modal>
              <WrappedComponent {...this.props} />
            </Aux>
          );
        }
};

export default withErrorHandler;
