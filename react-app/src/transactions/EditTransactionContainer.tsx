import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AppState } from '@shared/state/app.state';
import { combineContainers } from '@shared/combine-containers';
import { EditTransactionProps, EditTransactionDispatchProps, EditTransaction } from './EditTransaction';
import { saveTransaction } from './transaction.actions';
import { getFriends } from 'src/social';

function mapStateToProps(state: AppState): EditTransactionProps {
  return {
    friends: state.social.friends,
    gettingFriends: state.social.gettingFriends,
    currentUser: state.auth.currentUser!,
    currencies: state.currency.avaiableCurrencies
  };
}

const mapDispatchToProps: EditTransactionDispatchProps = { saveTransaction, getFriends };

export const EditTransactionContainer = combineContainers(EditTransaction, [
  component => reduxForm({ form: 'editTransactionForm', destroyOnUnmount: true })(component),
  component => connect(mapStateToProps, mapDispatchToProps)(component)
]);
