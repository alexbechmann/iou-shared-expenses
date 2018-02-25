import * as React from 'react';
import { InjectedFormProps, Field } from "redux-form";
import { Action } from "redux";
import { TextField } from "redux-form-material-ui";

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
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
}
