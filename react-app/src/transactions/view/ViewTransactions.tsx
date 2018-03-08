import * as React from 'react';
import { Transaction } from '@shared/schema';
import { Action } from 'redux';
import { RouteComponentProps } from 'react-router';
import { User } from 'parse';
import { Loader } from '@shared/ui';

export interface ViewTransactionsRouteParameters {
  toUserId: string;
}

export interface ViewTransactionsDispatchProps {
  getTransactionsToUser: (currentUserId: string, toUserId: string, excludeIds: string[]) => Action;
  getFriendsForUser: (user: User) => Action;
}

export interface ViewTransactionsProps {
  transactions: Transaction[];
  currentUser: User;
  friend?: User;
}

interface Props
  extends ViewTransactionsProps,
    ViewTransactionsDispatchProps,
    RouteComponentProps<ViewTransactionsRouteParameters> {}

export class ViewTransactions extends React.Component<Props> {
  render() {
    return this.props.friend ? this.renderTransactions() : <Loader />;
  }

  renderTransactions() {
    return (
      <div>
        {this.props.transactions.map(transaction => {
          return <p key={transaction.id}>{transaction.title}</p>;
        })}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.friend) {
      this.props.getTransactionsToUser(this.props.currentUser.id, this.props.friend.id, []);
    } else {
      this.props.getFriendsForUser(this.props.currentUser);
    }
  }
}
