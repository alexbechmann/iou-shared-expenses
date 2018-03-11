import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Action } from 'redux';
import { Transaction } from '@shared/schema';
import { InjectedFormProps, Field } from 'redux-form';
import { Button, MenuItem, FormControl, InputLabel, Typography } from 'material-ui';
import { nameof, CurrencyType, Currency, TransactionType } from '@iou/core';
import * as ReduxFormMaterialFields from 'redux-form-material-ui';
import { createUserPointer } from 'src/parse';
import { User } from 'parse';

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
  saveTransaction: (transaction: Transaction) => Action;
  getFriendsForUser: (user: User) => Action;
}

interface Props
  extends RouteComponentProps<RouteParameters>,
    EditTransactionProps,
    EditTransactionDispatchProps,
    InjectedFormProps {}

interface State {
  lastTouchedUserSelect: string;
}

export class EditTransaction extends React.Component<Props, State> {
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
          {user.id}
        </MenuItem>
      );
    });
  }

  handleOnSubmit(transactionFormData: TransactionFormData) {
    const transaction = new Transaction();
    Object.assign(transaction, transactionFormData);
    transaction.fromUser = createUserPointer(transactionFormData.fromUserId);
    transaction.toUser = createUserPointer(transactionFormData.toUserId);
    this.props.saveTransaction(transaction);
  }

  renderError() {
    return <span />;
  }

  componentDidMount() {
    this.props.getFriendsForUser(this.props.currentUser);
  }
}
