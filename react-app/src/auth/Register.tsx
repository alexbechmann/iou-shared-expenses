import * as React from 'react';
import { InjectedFormProps, Field } from "redux-form";
import { Action } from "redux";
import { TextField } from "redux-form-material-ui";
import { Button } from "material-ui";

export interface RegisterDispatchProps {
  register: (username: string, email: string, password: string) => Action;
}

interface Props extends InjectedFormProps, RegisterDispatchProps { }

export class Register extends React.Component<Props> {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            component={TextField}
            type="email"
            placeholder="Email"
            label="Email"
          />
          <Field
            name="username"
            component={TextField}
            type="text"
            placeholder="Username"
            label="Username"
          />
          <Field
            name="password"
            component={TextField}
            type="password"
            placeholder="Password"
            label="Password"
          />
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
