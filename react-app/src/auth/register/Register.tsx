import * as React from 'react';
import { InjectedFormProps, Field } from 'redux-form';
import { Action } from 'redux';
import { TextField } from 'redux-form-material-ui';
import { Button, CircularProgress } from 'material-ui';
import { RegisterModel } from './register.model';

export interface RegisterProps {
  registerError?: string;
  registering: boolean;
}

export interface RegisterDispatchProps {
  register: (registerModel: RegisterModel) => Action;
}

interface Props extends InjectedFormProps, RegisterProps, RegisterDispatchProps {}

const FullWidthTextField = props => <TextField {...props} fullWidth={true} />;

export class Register extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.register = this.register.bind(this);
  }

  render() {
    return !this.props.registering ? this.renderForm() : <CircularProgress />;
  }

  renderForm() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.register)}>
          <div>
            <Field name="email" component={FullWidthTextField} type="email" placeholder="Email" label="Email" />
            <Field name="username" component={FullWidthTextField} type="text" placeholder="Username" label="Username" />
            <Field
              name="password"
              component={FullWidthTextField}
              type="password"
              placeholder="Password"
              label="Password"
            />
          </div>
          <div>
            <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
              Register
            </Button>
            <Button variant="raised" type="submit" disabled={pristine || submitting} onClick={reset}>
              Clear
            </Button>
          </div>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderError() {
    if (this.props.registerError) {
      return <p>{this.props.registerError}</p>;
    }
    return null;
  }

  register(registerModel: RegisterModel) {
    this.props.register(registerModel);
  }
}
