import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { User } from 'parse';
import { Loader } from 'src/shared/ui';
import { AppState } from 'src/state';
import { connect } from 'react-redux';
import { getTransactionsToUser } from 'src/transactions/state/transaction.actions';
import { getFriendsForUser } from 'src/social/state/social.actions';
import { List, ListItem, ListItemIcon, ListItemText, Paper, ListSubheader } from 'material-ui';
import * as Icons from '@material-ui/icons';
import { SettlementsTable } from 'src/settlements/SettlementsTable';
import { UserProperties, userHelper, Transaction } from '@iou/core';
import { combineContainers } from 'combine-containers';

export interface ViewTransactionsRouteParameters {
  toUserId: string;
}

export interface ViewTransactionsComponentDispatchProps {
  getTransactionsToUser: (currentUserId: string, toUserId: string, excludeIds: string[]) => any;
  getFriendsForUser: (user: User) => any;
}

export interface ViewTransactionsComponentProps {
  transactions: Transaction[];
  currentUser: User;
  friend?: User;
  gettingTransactions: boolean;
  gettingFriends: boolean;
}

interface Props
  extends ViewTransactionsComponentProps,
  ViewTransactionsComponentDispatchProps,
  RouteComponentProps<ViewTransactionsRouteParameters> { }

export class ViewTransactionsComponent extends React.Component<Props> {
  render() {
    return this.props.friend ? this.renderTransactions() : <Loader />;
  }

  renderTransactions() {
    const userProperties: UserProperties = userHelper.getUserProperties(this.props.friend!);
    return (
      <div>
        <Paper>
          <List>
            <ListSubheader>{userProperties.displayName}</ListSubheader>
            <SettlementsTable friend={this.props.friend!} />
            {this.props.transactions.map(transaction => {
              return (
                <ListItem
                  button={true}
                  onClick={() => this.props.history.push(`/view-transactions/${transaction.id}`)}
                  // component={() => <Link to={`/view-transactions/${this.props.friend!.id}`} />}
                  key={transaction.id}
                >
                  <ListItemIcon>
                    <Icons.CreditCard />
                  </ListItemIcon>
                  <ListItemText>{transaction.title}</ListItemText>
                </ListItem>

              );
            })}
          </List>
        </Paper>
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
      props
        .getFriendsForUser(props.currentUser)
        .then(() => {
          this.props.getTransactionsToUser(this.props.currentUser.id, this.props.friend!.id, []);
        })
        .catch(console.log);
    }
  }
}

function mapStateToProps(
  state: AppState,
  ownProps: ViewTransactionsComponentProps & RouteComponentProps<ViewTransactionsRouteParameters>
): ViewTransactionsComponentProps {
  return {
    transactions: state.transactions.allTransactions.filter(
      transaction =>
        (transaction.getFromUser().id === state.auth.currentUser!.id &&
          transaction.getToUser().id === ownProps.match.params.toUserId) ||
        (transaction.getToUser().id === state.auth.currentUser!.id &&
          transaction.getFromUser().id === ownProps.match.params.toUserId)
    ),
    currentUser: state.auth.currentUser!,
    friend: state.social.friends.find(user => user.id === ownProps.match.params.toUserId),
    gettingTransactions: state.transactions.gettingTransactions,
    gettingFriends: state.social.gettingFriends
  };
}

const mapDispatchToProps: ViewTransactionsComponentDispatchProps = { getTransactionsToUser, getFriendsForUser };

export const ViewTransactions = combineContainers(ViewTransactionsComponent, [
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
]);
