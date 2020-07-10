import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignup: true,
  }

  componentDidMount() {
    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props;
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { controls } = this.state;
    const updatedControl = updateObject(
      controls[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
        touched: true,
      },
    );
    const updatedControls = updateObject(controls, { [inputIdentifier]: updatedControl });

    let formIsValid = true;
    for (const updatedInputIdentifier in updatedControls) {
      formIsValid = updatedControls[updatedInputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { controls: { email, password }, isSignup } = this.state;
    const { onAuth } = this.props;
    onAuth(email.value, password.value, isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const formElementsArray = [];
    const { controls, formIsValid, isSignup } = this.state;
    const {
      loading, error, isAuthenticated, authRedirectPath,
    } = this.props;
    Object.keys(controls).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    });
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="submit" btnType="Success" disabled={!formIsValid}>
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO { isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
