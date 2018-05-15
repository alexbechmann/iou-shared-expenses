import * as React from 'react';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import { Action } from 'redux';
import { Button, CircularProgress, FormControl } from 'material-ui';
import { RegisterModel } from './register.model';
import { nameof } from '@iou/core';
import * as ReduxFormMaterialFields from 'redux-form-material-ui';
import { combineContainers } from 'combine-containers';
import { register } from '../auth.actions';
import { AppState } from 'src/state';
import { connect } from 'react-redux';

export interface RegisterProps {
  registerError?: string;
  registering: boolean;
}

export interface RegisterDispatchProps {
  register: (registerModel: RegisterModel) => Action;
}

interface Props extends InjectedFormProps, RegisterProps, RegisterDispatchProps {}

export class RegisterComponent extends React.Component<Props> {
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
            <FormControl fullWidth={true}>
              <Field
                name={nameof<RegisterModel>('email')}
                component={ReduxFormMaterialFields.TextField}
                type="email"
                placeholder="Email"
                label="Email"
              />
            </FormControl>

            <FormControl fullWidth={true}>
              <Field
                name={nameof<RegisterModel>('username')}
                component={ReduxFormMaterialFields.TextField}
                type="text"
                placeholder="Username"
                label="Username"
              />
            </FormControl>

            <FormControl fullWidth={true}>
              <Field
                name={nameof<RegisterModel>('password')}
                component={ReduxFormMaterialFields.TextField}
                type="password"
                placeholder="Password"
                label="Password"
              />
            </FormControl>
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

function mapStateToProps(state: AppState): RegisterProps {
  return {
    registerError: state.auth.registerError,
    registering: state.auth.registering
  };
}

const mapDispatchToProps: RegisterDispatchProps = { register };

export const Register = combineContainers(RegisterComponent, [
  reduxForm({ form: 'authform', destroyOnUnmount: false }),
  connect(mapStateToProps, mapDispatchToProps)
]);
