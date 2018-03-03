import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Action } from 'redux';
import { Transaction } from '@shared/schema';
import { InjectedFormProps, Field } from 'redux-form';
import { Button, MenuItem } from 'material-ui';
import { FullWidthFormTextField, FullWidthFormSelectField } from '@shared/ui/redux-form';
import { nameof } from '@iou/core';
import { User } from 'parse';

interface RouteParameters {
  id: number;
  type: string;
}

export interface EditTransactionProps {
  friends: Parse.User[];
  gettingFriends: boolean;
  currentUser: Parse.User;
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
            name={nameof<Transaction>('title')}
            component={FullWidthFormTextField}
            type="text"
            placeholder="Title"
            label="Title"
          />

          <Field
            name={nameof<Transaction>('fromUser')}
            component={FullWidthFormSelectField}
            placeholder="From user"
            label="From user"
            disabled={this.props.gettingFriends}
          >
            {this.renderfriendOptions()}
          </Field>

          <Field
            name={nameof<Transaction>('toUser')}
            component={FullWidthFormSelectField}
            placeholder="To user"
            label="To user"
            disabled={this.props.gettingFriends}
          >
            {this.renderfriendOptions()}
          </Field>

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

  handleOnSubmit(transaction: Transaction) {
    console.log(transaction);
  }

  renderError() {
    return <span />;
  }

  componentDidMount() {
    this.props.getFriends(this.props.currentUser);
  }
}
