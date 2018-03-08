import { AppState } from '@shared/state';
import {
  ViewTransactionsProps,
  ViewTransactions,
  ViewTransactionsDispatchProps,
  ViewTransactionsRouteParameters
} from './ViewTransactions';
import { connect } from 'react-redux';
import { getTransactionsToUser } from '../transaction.actions';
import { RouteComponentProps } from 'react-router';
import { getFriendsForUser } from 'src/social';

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
    friend: state.social.friends.find(user => user.id === ownProps.match.params.toUserId)
  };
}

const mapDispatchToProps: ViewTransactionsDispatchProps = { getTransactionsToUser, getFriendsForUser };

export const ViewTransactionsContainer = connect(mapStateToProps, mapDispatchToProps)(ViewTransactions);
