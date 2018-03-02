import { reduxForm } from 'redux-form';
import { Register, RegisterDispatchProps, RegisterProps } from './Register';
import { connect } from 'react-redux';
import { register } from '../auth.actions';
import { combineContainers } from '@shared/combine-containers';
import { AppState } from '@shared/state/app.state';

function mapStateToProps(state: AppState): RegisterProps {
  return {
    registerError: state.auth.registerError,
    registering: state.auth.registering
  };
}

const mapDispatchToProps: RegisterDispatchProps = { register };

export const RegisterContainer = combineContainers(Register, [
  component => reduxForm({ form: 'authform', destroyOnUnmount: false })(component),
  component => connect(mapStateToProps, mapDispatchToProps)(component)
]);
