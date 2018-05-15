import * as React from 'react';
import { Transaction } from 'src/shared/schema';
import { RouteComponentProps } from 'react-router';
import { User } from 'parse';
import { Loader } from 'src/shared/ui';
import { AnyAction } from 'redux';
import { AppState } from 'src/state';
import { getTransactionsToUser } from 'src/transactions/transaction.actions';
import { getFriendsForUser } from 'src/social';
import { connect } from 'react-redux';

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

function mapStateToProps(
  state: AppState,
  ownProps: ViewTransactionsProps & RouteComponentProps<ViewTransactionsRouteParameters>
): ViewTransactionsProps {
  return {
    transactions: state.transactions.allTransactions.filter(
      transaction =>
        transaction.fromUser.objectId === state.auth.currentUser!.id &&
        transaction.toUser.objectId === ownProps.match.params.toUserId
    ),
    currentUser: state.auth.currentUser!,
    friend: state.social.friends.find(user => user.id === ownProps.match.params.toUserId),
    gettingTransactions: state.transactions.gettingTransactions,
    gettingFriends: state.social.gettingFriends
  };
}

const mapDispatchToProps: ViewTransactionsDispatchProps = { getTransactionsToUser, getFriendsForUser };

export const ViewTransactionsContainer = connect(mapStateToProps, mapDispatchToProps)(ViewTransactions);
