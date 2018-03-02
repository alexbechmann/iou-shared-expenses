import { reduxForm } from 'redux-form';
import { Login, LoginDispatchProps, LoginProps } from './Login';
import { loginWithFacebook, loginWithPassword } from '../auth.actions';
import { connect } from 'react-redux';
import { AppState } from '@shared/state/app.state';

function mapStateToProps(state: AppState): LoginProps {
  return {
    loginError: state.auth.loginError
  };
}

const mapDispatchToProps: LoginDispatchProps = { loginWithFacebook, loginWithPassword };

export const LoginContainer = reduxForm({ form: 'authform', destroyOnUnmount: false })(connect(mapStateToProps, mapDispatchToProps)(Login));
