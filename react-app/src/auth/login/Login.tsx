import * as React from 'react';
import { Button } from 'material-ui';
import { Action } from 'redux';
import { InjectedFormProps, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Loader } from '@shared/index';

export interface LoginProps {
  loginError?: string;
  loggingIn: boolean;
}

export interface LoginDispatchProps {
  loginWithFacebook: () => Action;
  loginWithPassword: (username: string, password: string) => Action;
}

interface FormData {
  username: string;
  password: string;
}

export interface Props extends InjectedFormProps, LoginDispatchProps, LoginProps {}

const FullWidthTextField = props => <TextField {...props} fullWidth={true} />;

export class Login extends React.Component<Props> {
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
          <Field name="username" component={FullWidthTextField} type="text" placeholder="Username" label="Username" />
          <Field
            name="password"
            component={FullWidthTextField}
            type="password"
            placeholder="Password"
            label="Password"
          />

          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
            Login
          </Button>
          <Button variant="raised" color="secondary" type="submit" disabled={pristine || submitting} onClick={reset}>
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

  handleOnSubmit(formData: FormData) {
    const { username, password } = formData;
    this.props.loginWithPassword(username, password);
  }
}
