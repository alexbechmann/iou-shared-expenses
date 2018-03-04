import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Action } from 'redux';
import { Transaction } from '@shared/schema';
import { InjectedFormProps, Field } from 'redux-form';
import { Button, MenuItem, FormControl, InputLabel } from 'material-ui';
import { Select } from 'redux-form-material-ui';
import { nameof, CurrencyType, Currency, TransactionType } from '@iou/core';
import { User } from 'parse';
import { FullWidthFormTextField } from '@shared/ui/redux-form';
import { createUserPointer } from 'src/parse';

interface RouteParameters {
  id: number;
  type: string;
}

export interface EditTransactionProps {
  friends: Parse.User[];
  gettingFriends: boolean;
  currentUser: Parse.User;
  currencies: Currency[];
}

interface TransactionFormData {
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
  getFriends: (user: User) => Action;
}

interface Props
  extends RouteComponentProps<RouteParameters>,
    EditTransactionProps,
    EditTransactionDispatchProps,
    InjectedFormProps {}

export class EditTransaction extends React.Component<Props> {
  render() {
    const { type, id } = this.props.match.params;
    return (
      <span>
        {id} {type}
        {this.renderForm()}
      </span>
    );
  }

  renderForm() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleOnSubmit)}>
          <Field
            name={nameof<TransactionFormData>('title')}
            component={FullWidthFormTextField}
            type="text"
            placeholder="Title"
            label="Title"
          />

          <FormControl fullWidth={true}>
            <InputLabel>From user</InputLabel>
            <Field
              name={nameof<TransactionFormData>('fromUserId')}
              component={Select}
              placeholder="To user"
              disabled={this.props.gettingFriends}
            >
              {this.renderfriendOptions()}
            </Field>
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>To user</InputLabel>
            <Field
              name={nameof<TransactionFormData>('toUserId')}
              component={Select}
              placeholder="To user"
              disabled={this.props.gettingFriends}
            >
              {this.renderfriendOptions()}
            </Field>
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>Currency</InputLabel>
            <Field name={nameof<TransactionFormData>('currencyId')} component={Select} placeholder="Currency">
              {this.props.currencies.map(currency => {
                return (
                  <MenuItem key={currency.id} value={currency.id}>
                    {currency.name}
                  </MenuItem>
                );
              })}
            </Field>
          </FormControl>

          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
            Save
          </Button>
          <Button variant="raised" type="submit" disabled={pristine || submitting} onClick={reset}>
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
    console.log(transaction);
  }

  renderError() {
    return <span />;
  }

  componentDidMount() {
    this.props.getFriends(this.props.currentUser);
  }
}
