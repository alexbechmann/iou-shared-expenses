import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AppState } from '@shared/state/app.state';
import { combineContainers } from '@shared/combine-containers';
import {
  EditTransactionProps,
  EditTransactionDispatchProps,
  EditTransaction,
  TransactionFormData
} from './EditTransaction';
import { saveTransaction } from './transaction.actions';
import { getFriends } from 'src/social';
import { CurrencyType } from '@iou/core';

function mapStateToProps(state: AppState): EditTransactionProps {
  const initialFormValues: Partial<TransactionFormData> = {
    title: '',
    currencyId: CurrencyType.GBP,
    fromUserId: state.auth.currentUser!.id
  };
  return {
    friends: state.social.friends,
    gettingFriends: state.social.gettingFriends,
    currentUser: state.auth.currentUser!,
    currencies: state.currency.avaiableCurrencies,
    initialValues: initialFormValues
  } as EditTransactionProps;
}

const mapDispatchToProps: EditTransactionDispatchProps = { saveTransaction, getFriends };

export const EditTransactionContainer = combineContainers(EditTransaction, [
  component =>
    reduxForm({
      form: 'editTransactionForm',
      destroyOnUnmount: true
    })(component),
  component => connect(mapStateToProps, mapDispatchToProps)(component)
]);
