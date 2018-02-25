import * as React from 'react';
import { InjectedFormProps, Field } from "redux-form";
import { Action } from "redux";

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
            component="input"
            type="email"
            placeholder="Email"
          />

          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
          />

          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
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
