import { reduxForm, FormErrors, InjectedFormProps } from 'redux-form';
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

const nullOrEmpty = (value: string) => !value || value.length < 1;

const validate = (values: TransactionFormData) => {
  const errors: FormErrors<TransactionFormData> = {};
  if (nullOrEmpty(values.title)) {
    errors.title = 'Required';
  }
  if (nullOrEmpty(values.fromUserId)) {
    errors.fromUserId = 'Required';
  }
  if (nullOrEmpty(values.toUserId)) {
    errors.fromUserId = 'Required';
  }
  // Not ready due to: https://github.com/erikras/redux-form-material-ui/issues/216
  // if (!nullOrEmpty(values.fromUserId) && !nullOrEmpty(values.toUserId) && values.fromUserId === values.toUserId) {
  //   errors.fromUserId = 'Cannot be equal to To user';
  //   errors.toUserId = 'Cannot be equal to From user';
  // }
  return errors;
};

function mapStateToProps(state: AppState): Partial<EditTransactionProps & InjectedFormProps<TransactionFormData>> {
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
    initialValues: initialFormValues,
    formValues: state.form['editTransactionForm'] ? state.form['editTransactionForm'].values : {}
  };
}

const mapDispatchToProps: EditTransactionDispatchProps = { saveTransaction, getFriends };

export const EditTransactionContainer = combineContainers(EditTransaction, [
  component =>
    reduxForm({
      form: 'editTransactionForm',
      destroyOnUnmount: true,
      validate: validate
    })(component),
  component => connect(mapStateToProps, mapDispatchToProps)(component)
]);
