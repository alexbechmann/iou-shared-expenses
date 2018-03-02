import { reduxForm } from 'redux-form';
import { Register, RegisterDispatchProps } from './Register';
import { connect } from 'react-redux';
import { register } from '../auth.actions';
import { combineContainers } from '@shared/combine-containers';

const mapDispatchToProps: RegisterDispatchProps = { register };

export const RegisterContainer = combineContainers(Register, [
  component => reduxForm({ form: 'authform', destroyOnUnmount: false })(component),
  component => connect(null, mapDispatchToProps)(component)
]);
