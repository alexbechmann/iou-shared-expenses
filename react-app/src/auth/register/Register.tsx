import * as React from 'react';
import { InjectedFormProps, Field } from 'redux-form';
import { Action } from 'redux';
import { TextField } from 'redux-form-material-ui';
import { Button } from 'material-ui';

export interface RegisterDispatchProps {
  register: (username: string, email: string, password: string) => Action;
}

interface Props extends InjectedFormProps, RegisterDispatchProps {}

const FullWidthTextField = props => <TextField {...props} fullWidth={true} />;

export class Register extends React.Component<Props> {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="email" component={FullWidthTextField} type="email" placeholder="Email" label="Email" />
          <Field name="username" component={FullWidthTextField} type="text" placeholder="Username" label="Username" />
          <Field name="password" component={FullWidthTextField} type="password" placeholder="Password" label="Password" />
        </div>
        <div>
          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
            Login
          </Button>
          <Button variant="raised" color="secondary" type="submit" disabled={pristine || submitting} onClick={reset}>
            Clear
          </Button>
        </div>
      </form>
    );
  }
}
