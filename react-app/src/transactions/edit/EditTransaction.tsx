import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Transaction } from '@iou/core';
import { InjectedFormProps, Field, FormErrors, reduxForm } from 'redux-form';
import { Button, MenuItem, FormControl, InputLabel, Typography, CircularProgress } from '@material-ui/core';
import { nameof, CurrencyType, Currency, TransactionType, userHelper } from '@iou/core';
import * as ReduxFormMaterialFields from 'redux-form-material-ui';
import { createUserPointer } from 'src/parse/create-user-pointer';
import { User } from 'parse';
import { AppState } from 'src/state';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { saveTransaction, getTransactionAndSetEditFormValues } from 'src/transactions/state/transaction.actions';
import { getFriendsForUser } from 'src/social/state/social.actions';

interface RouteParameters {
  id: string;
  type: string;
}

export interface EditTransactionProps {
  friends: User[];
  gettingFriends: boolean;
  currentUser: User;
  currencies: Currency[];
  formValues: Partial<TransactionFormData>;
  saving: boolean;
  loadingEditTransaction: boolean;
  transactionReadyForEdit: boolean;
}

export interface TransactionFormData {
  id: string;
  title: string;
  amount: string;
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
  getTransactionAndSetEditFormValues: (id: string, formName: string) => any;
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
        {!this.props.loadingEditTransaction ? this.renderForm() : <CircularProgress />}
      </span>
    );
  }

  componentDidMount() {
    this.props.getFriendsForUser(this.props.currentUser);
    if (this.props.match.params.id) {
      this.props.getTransactionAndSetEditFormValues(this.props.match.params.id, this.props.form);
    }
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
          <FormControl fullWidth>
            <InputLabel>From user</InputLabel>
            <Field
              name={nameof<TransactionFormData>('fromUserId')}
              component={ReduxFormMaterialFields.Select}
              placeholder="To user"
              disabled={this.props.gettingFriends || this.props.saving}
              onChange={() => this.setState({ lastTouchedUserSelect: nameof<TransactionFormData>('fromUserId') })}
            >
              {this.renderFriendOptions()}
            </Field>
          </FormControl>
          <br />
          <br />
          {(() => {
            let value = ``;
            switch (this.props.formValues.transactionType) {
              case TransactionType.IOU: {
                value = 'owe';
                break;
              }
              case TransactionType.Payment: {
                value = 'paid';
                break;
              }
              default: {
                break;
              }
            }
            return <Typography variant="body1">{value}</Typography>;
          })()}
          <br />
          <FormControl fullWidth={true}>
            <InputLabel>To user</InputLabel>
            <Field
              name={nameof<TransactionFormData>('toUserId')}
              component={ReduxFormMaterialFields.Select}
              placeholder="To user"
              disabled={this.props.gettingFriends || this.props.saving}
              onChange={() => this.setState({ lastTouchedUserSelect: nameof<TransactionFormData>('toUserId') })}
            >
              {this.renderFriendOptions()}
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
            <InputLabel>Transaction type</InputLabel>
            <Field
              name={nameof<TransactionFormData>('transactionType')}
              component={ReduxFormMaterialFields.Select}
              placeholder="Transaction type"
              disabled={this.props.saving}
            >
              {Object.keys(TransactionType)
                .filter(key => !isNaN(Number(TransactionType[key])))
                .map(transactionType => {
                  return (
                    <MenuItem key={transactionType} value={TransactionType[transactionType]}>
                      {transactionType}
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

  renderFriendOptions() {
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
    transaction.amount = parseInt(transactionFormData.amount, 10);
    transaction.setFromUserPointer(createUserPointer(transactionFormData.fromUserId));
    transaction.setToUserPointer(createUserPointer(transactionFormData.toUserId));
    this.props.saveTransaction(transaction).then(() => {
      this.props.history.push('/overview');
    });
  }

  renderError() {
    return <span />;
  }
}

const nullOrEmpty = (value: string) => !value || value.length < 1;

const formName = 'editTransactionForm';

const validate = (values: TransactionFormData) => {
  const errors: FormErrors<TransactionFormData> = {};
  if (nullOrEmpty(values.title)) {
    errors.title = 'Required';
  }
  if (!(parseInt(values.amount, 10) > 0)) {
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

function mapStateToProps(
  state: AppState,
  ownProps: RouteComponentProps<RouteParameters>
): Partial<EditTransactionProps & InjectedFormProps<TransactionFormData>> {
  const initialFormValues: Partial<TransactionFormData> = {
    title: '',
    currencyId: CurrencyType.GBP,
    fromUserId: state.auth.currentUser!.id,
    transactionType: (ownProps.match.params.type && parseInt(ownProps.match.params.type, 10)) || TransactionType.IOU
  };
  return {
    friends: state.social.friends,
    gettingFriends: state.social.gettingFriends,
    currentUser: state.auth.currentUser!,
    currencies: state.currency.avaiableCurrencies,
    initialValues: initialFormValues,
    formValues: state.form[formName] ? state.form[formName].values : {},
    saving: state.transactions.savingTransaction,
    loadingEditTransaction: state.transactions.loadingEditTransaction
  };
}

const mapDispatchToProps: EditTransactionDispatchProps = {
  saveTransaction,
  getFriendsForUser,
  getTransactionAndSetEditFormValues
};

export const EditTransaction = combineContainers(EditTransactionComponent, [
  reduxForm({
    form: formName,
    destroyOnUnmount: true,
    validate: validate
  }),
  connect(mapStateToProps, mapDispatchToProps)
]);
