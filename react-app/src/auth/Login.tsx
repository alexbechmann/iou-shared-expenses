import * as React from 'react';
import { Button } from 'material-ui';
import { Action } from 'redux';
import { InjectedFormProps, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

export interface LoginDispatchProps {
  loginWithFacebook: () => Action;
  loginWithPassword: (username: string, password: string) => Action;
}

interface FormData {
  username: string;
  password: string;
}

interface Props extends InjectedFormProps, LoginDispatchProps {}

export class Login extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.props.loginWithFacebook}>
          Login with Facebook
        </Button>

        <form onSubmit={handleSubmit(this.handleOnSubmit)}>
          <Field name="email" component={TextField} type="email" placeholder="Email" label="Email" />
          <Field name="password" component={TextField} type="password" placeholder="Password" label="Password" />

          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
            Login
          </Button>
          <Button variant="raised" color="secondary" type="submit" disabled={pristine || submitting} onClick={reset}>
            Clear
          </Button>
        </form>
      </div>
    );
  }

  handleOnSubmit(formData: FormData) {
    const { username, password } = formData;
    this.props.loginWithPassword(username, password);
  }
}
