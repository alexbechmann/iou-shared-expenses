import * as React from 'react';
import { Action } from 'redux';
import { Button, WithStyles, withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { Loader } from 'src/shared/ui';
import { User } from 'parse';
import { OverviewCard } from './overview-card/OverviewCard';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { getFriendsForUser } from 'src/social/state/social.actions';
import { AppState } from 'src/state';
import { NewTransactionDialog } from 'src/transactions/dialog/NewTransactionDialog';

type ClassNames = 'actionButton';

export const overviewStyles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  actionButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

export interface OverviewProps {
  currentUser: any;
  loading: boolean;
  friends: User[];
}

export interface OverviewDispatchProps {
  getFriendsForUser: (user: User) => Action;
}

interface Props extends OverviewProps, OverviewDispatchProps, WithStyles<ClassNames> {}

interface State {
  newTransactionDialogOpen: boolean;
}

export class OverviewComponent extends React.Component<Props, State> {
  state: State = {
    newTransactionDialogOpen: false
  };

  render() {
    return this.props.loading && this.props.friends.length === 0 ? <Loader /> : this.renderOverview();
  }

  renderOverview() {
    return (
      <div>
        {this.props.friends.map(friend => {
          return <OverviewCard key={friend.id} friend={friend} />;
        })}
        <Button
          variant="fab"
          className={this.props.classes.actionButton}
          color="primary"
          onClick={this.openNewTransactionDialog}
        >
          <Icons.Add />
        </Button>
        <NewTransactionDialog open={this.state.newTransactionDialogOpen} handleClose={this.closeNewTransactionDialog} />
      </div>
    );
  }

  componentDidMount() {
    this.props.getFriendsForUser(this.props.currentUser);
  }

  openNewTransactionDialog = () => {
    this.setState({ newTransactionDialogOpen: true });
  };

  closeNewTransactionDialog = () => {
    this.setState({ newTransactionDialogOpen: false });
  };
}

function mapStateToProps(state: AppState): OverviewProps {
  return {
    currentUser: state.auth.currentUser,
    loading: state.social.gettingFriends,
    friends: state.social.friends
  };
}

const mapDispatchToProps: OverviewDispatchProps = { getFriendsForUser };

export const Overview = combineContainers(OverviewComponent, [
  withStyles(overviewStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
]);
