import { reduxForm } from 'redux-form';
import { Login, LoginDispatchProps } from './Login';
import { loginWithFacebook, loginWithPassword } from './auth.actions';
import { connect } from 'react-redux';

const mapDispatchToProps: LoginDispatchProps = { loginWithFacebook, loginWithPassword };

export const LoginContainer = reduxForm({ form: 'authform', destroyOnUnmount: false })(connect(null, mapDispatchToProps)(Login));
