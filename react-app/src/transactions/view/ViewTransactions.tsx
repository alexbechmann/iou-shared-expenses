import * as React from 'react';
import { Transaction } from '@shared/schema';
import { RouteComponentProps } from 'react-router';
import { User } from 'parse';
import { Loader } from '@shared/ui';
import { AnyAction } from 'redux';

export interface ViewTransactionsRouteParameters {
  toUserId: string;
}

export interface ViewTransactionsDispatchProps {
  getTransactionsToUser: (currentUserId: string, toUserId: string, excludeIds: string[]) => AnyAction;
  getFriendsForUser: (user: User) => AnyAction;
}

export interface ViewTransactionsProps {
  transactions: Transaction[];
  currentUser: User;
  friend?: User;
  gettingTransactions: boolean;
  gettingFriends: boolean;
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
        {this.props.transactions.length}
        {this.props.transactions.map(transaction => {
          return <p key={transaction.id}>{transaction.title}</p>;
        })}
      </div>
    );
  }

  componentDidMount() {
    this.refresh(this.props);
  }

  refresh(props: Props) {
    if (props.friend) {
      props.getTransactionsToUser(this.props.currentUser.id, props.friend.id, []);
    } else {
      const promise = (props.getFriendsForUser(props.currentUser) as any) as Promise<any>;
      promise.then(() => {
        props.getTransactionsToUser(this.props.currentUser.id, props.friend!.id, []);
      });
    }
  }
}
