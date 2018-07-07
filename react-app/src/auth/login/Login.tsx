import * as React from 'react';
import { Button, FormControl } from '@material-ui/core';
import { Action } from 'redux';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import { nameof } from '@iou/core';
import { LoginModel } from './models/login.model';
import { Loader } from 'src/shared/ui';
import { combineContainers } from 'combine-containers';
import * as ReduxFormMaterialFields from 'redux-form-material-ui';
import { loginWithFacebook, loginWithPassword } from '../state/auth.actions';
import { connect } from 'react-redux';
import { AppState } from 'src/state';

export interface LoginProps {
  loginError?: string;
  loggingIn: boolean;
}

export interface LoginDispatchProps {
  loginWithFacebook: () => Action;
  loginWithPassword: (loginModel: LoginModel) => Action;
}

export interface Props extends InjectedFormProps, LoginDispatchProps, LoginProps {}

export class LoginComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  render() {
    return !this.props.loggingIn ? this.renderForm() : <Loader />;
  }

  renderForm() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.props.loginWithFacebook}>
          Login with Facebook
        </Button>

        <form onSubmit={handleSubmit(this.handleOnSubmit)}>
          <FormControl fullWidth={true}>
            <Field
              name={nameof<LoginModel>('username')}
              component={ReduxFormMaterialFields.TextField}
              type="text"
              placeholder="Username"
              label="Username"
            />
          </FormControl>

          <FormControl fullWidth={true}>
            <Field
              name={nameof<LoginModel>('password')}
              component={ReduxFormMaterialFields.TextField}
              type="password"
              placeholder="Password"
              label="Password"
            />
          </FormControl>

          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
            Login
          </Button>
          <Button variant="raised" type="submit" disabled={pristine || submitting} onClick={reset}>
            Clear
          </Button>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderError() {
    if (this.props.loginError) {
      return <p>{this.props.loginError}</p>;
    }
    return null;
  }

  handleOnSubmit(loginModel: LoginModel) {
    this.props.loginWithPassword(loginModel);
  }
}

function mapStateToProps(state: AppState): LoginProps {
  return {
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn
  };
}

const mapDispatchToProps: LoginDispatchProps = { loginWithFacebook, loginWithPassword };

export const Login = combineContainers(
  reduxForm({ form: 'authform', destroyOnUnmount: false }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginComponent);
