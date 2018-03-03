import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AppState } from '@shared/state/app.state';
import { combineContainers } from '@shared/combine-containers';
import { EditTransactionProps, EditTransactionDispatchProps, EditTransaction } from './EditTransaction';
import { saveTransaction } from './transaction.actions';

function mapStateToProps(state: AppState): EditTransactionProps {
  return {
    friends: state.social.friends,
    gettingFriends: state.social.gettingFriends
  };
}

const mapDispatchToProps: EditTransactionDispatchProps = { saveTransaction };

export const LoginContainer = combineContainers(EditTransaction, [
  component => reduxForm({ form: 'editTransactionForm', destroyOnUnmount: true })(component),
  component => connect(mapStateToProps, mapDispatchToProps)(component)
]);
