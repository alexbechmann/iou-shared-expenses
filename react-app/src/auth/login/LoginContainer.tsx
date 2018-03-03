import { reduxForm } from 'redux-form';
import { Login, LoginDispatchProps, LoginProps } from './Login';
import { loginWithFacebook, loginWithPassword } from '../auth.actions';
import { connect } from 'react-redux';
import { AppState } from '@shared/state/app.state';
import { combineContainers } from '@shared/combine-containers';

function mapStateToProps(state: AppState): LoginProps {
  return {
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn
  };
}

const mapDispatchToProps: LoginDispatchProps = { loginWithFacebook, loginWithPassword };

export const LoginContainer = combineContainers(Login, [
  component => reduxForm({ form: 'authform', destroyOnUnmount: false })(component),
  component => connect(mapStateToProps, mapDispatchToProps)(component)
]);
