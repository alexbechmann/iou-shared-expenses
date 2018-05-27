import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Transaction } from '@iou/core';
import { InjectedFormProps, Field, FormErrors, reduxForm } from 'redux-form';
import { Button, MenuItem, FormControl, InputLabel, Typography } from 'material-ui';
import { nameof, CurrencyType, Currency, TransactionType, userHelper } from '@iou/core';
import * as ReduxFormMaterialFields from 'redux-form-material-ui';
import { createUserPointer } from 'src/parse/create-user-pointer';
import { User } from 'parse';
import { AppState } from 'src/state';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { saveTransaction } from 'src/transactions/state/transaction.actions';
import { getFriendsForUser } from 'src/social/state/social.actions';

interface RouteParameters {
  id: number;
  type: string;
}

export interface EditTransactionProps {
  friends: User[];
  gettingFriends: boolean;
  currentUser: User;
  currencies: Currency[];
  formValues: Partial<TransactionFormData>;
  saving: boolean;
}

export interface TransactionFormData {
  title: string;
  amount: number;
  fromUserId: string;
  toUserId: string;
  currencyId: CurrencyType;
  isSecure: boolean;
  transactionDate: Date;
  transactionType: TransactionType;
}

export interface EditTransactionDispatchProps {
  saveTransaction: (transaction: Transaction) => any;
  getFriendsForUser: (user: User) => any;
}

interface Props
  extends RouteComponentProps<RouteParameters>,
    EditTransactionProps,
    EditTransactionDispatchProps,
    InjectedFormProps {}

interface State {
  lastTouchedUserSelect: string;
}

class EditTransactionComponent extends React.Component<Props, State> {
  state: State = {
    lastTouchedUserSelect: nameof<TransactionFormData>('fromUserId')
  };

  constructor(props: Props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  render() {
    const { type, id } = this.props.match.params;
    return (
      <span>
        <Typography variant="headline" gutterBottom={true}>
          {id} {type}
        </Typography>
        {this.renderForm()}
      </span>
    );
  }

  componentDidUpdate() {
    if (this.props.formValues.fromUserId === this.props.formValues.toUserId) {
      if (this.state.lastTouchedUserSelect === nameof<TransactionFormData>('fromUserId')) {
        this.props.change(nameof<TransactionFormData>('toUserId'), '');
      } else {
        this.props.change(nameof<TransactionFormData>('fromUserId'), '');
      }
    }
  }

  renderForm() {
    const { handleSubmit, pristine, reset, submitting, error } = this.props;
    return (
      <div>
        {error}
        <form onSubmit={handleSubmit(this.handleOnSubmit)}>
          <FormControl fullWidth={true}>
            <Field
              name={nameof<TransactionFormData>('title')}
              component={ReduxFormMaterialFields.TextField}
              type="text"
              placeholder="Title"
              label="Title"
              disabled={this.props.saving}
            />
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>From user</InputLabel>
            <Field
              name={nameof<TransactionFormData>('fromUserId')}
              component={ReduxFormMaterialFields.Select}
              placeholder="To user"
              disabled={this.props.gettingFriends || this.props.saving}
              onChange={() => this.setState({ lastTouchedUserSelect: nameof<TransactionFormData>('fromUserId') })}
            >
              {this.renderfriendOptions()}
            </Field>
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>To user</InputLabel>
            <Field
              name={nameof<TransactionFormData>('toUserId')}
              component={ReduxFormMaterialFields.Select}
              placeholder="To user"
              disabled={this.props.gettingFriends || this.props.saving}
              onChange={() => this.setState({ lastTouchedUserSelect: nameof<TransactionFormData>('toUserId') })}
            >
              {this.renderfriendOptions()}
            </Field>
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>Currency</InputLabel>
            <Field
              name={nameof<TransactionFormData>('currencyId')}
              component={ReduxFormMaterialFields.Select}
              placeholder="Currency"
              disabled={this.props.saving}
            >
              {this.props.currencies.map(currency => {
                return (
                  <MenuItem key={currency.id} value={currency.id}>
                    {currency.name}
                  </MenuItem>
                );
              })}
            </Field>
          </FormControl>

          <FormControl fullWidth={true}>
            <Field
              name={nameof<TransactionFormData>('amount')}
              component={ReduxFormMaterialFields.TextField}
              type="number"
              placeholder="Amount"
              label="Amount"
            />
          </FormControl>

          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting || this.props.saving}>
            Save
          </Button>
          <Button variant="raised" type="submit" disabled={pristine || submitting || this.props.saving} onClick={reset}>
            Clear
          </Button>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderfriendOptions() {
    return this.props.friends.concat([this.props.currentUser]).map(user => {
      return (
        <MenuItem key={user.id} value={user.id}>
          {user.id === this.props.currentUser.id ? 'You' : userHelper.getUserProperties(user).displayName}
        </MenuItem>
      );
    });
  }

  handleOnSubmit(transactionFormData: TransactionFormData) {
    const transaction = new Transaction();
    Object.assign(transaction, transactionFormData);
    transaction.setFromUserPointer(createUserPointer(transactionFormData.fromUserId));
    transaction.setToUserPointer(createUserPointer(transactionFormData.toUserId));
    this.props.saveTransaction(transaction).then(() => {
      this.props.history.push('/overview');
    });
  }

  renderError() {
    return <span />;
  }

  componentDidMount() {
    this.props.getFriendsForUser(this.props.currentUser);
  }
}

const nullOrEmpty = (value: string) => !value || value.length < 1;

const validate = (values: TransactionFormData) => {
  const errors: FormErrors<TransactionFormData> = {};
  if (nullOrEmpty(values.title)) {
    errors.title = 'Required';
  }
  if (!(values.amount > 0)) {
    errors.amount = 'Amount must be greater than zero';
  }
  // Known console error: https://github.com/erikras/redux-form-material-ui/issues/216
  if (nullOrEmpty(values.fromUserId)) {
    errors.fromUserId = 'Required';
  }
  if (nullOrEmpty(values.toUserId)) {
    errors.fromUserId = 'Required';
  }
  if (!nullOrEmpty(values.fromUserId) && !nullOrEmpty(values.toUserId) && values.fromUserId === values.toUserId) {
    errors.fromUserId = 'Cannot be equal to To user';
    errors.toUserId = 'Cannot be equal to From user';
  }
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
    formValues: state.form['editTransactionForm'] ? state.form['editTransactionForm'].values : {},
    saving: state.transactions.savingTransaction
  };
}

const mapDispatchToProps: EditTransactionDispatchProps = { saveTransaction, getFriendsForUser };

export const EditTransaction = combineContainers(EditTransactionComponent, [
  reduxForm({
    form: 'editTransactionForm',
    destroyOnUnmount: true,
    validate: validate
  }),
  connect(mapStateToProps, mapDispatchToProps)
]);
