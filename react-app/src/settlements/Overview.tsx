import * as React from 'react';
import { Action } from 'redux';
import { Button } from 'material-ui';
import { StyleRulesCallback, Theme } from 'material-ui/styles';
import * as Icons from '@material-ui/icons';
import { WithStyles } from 'material-ui/styles/withStyles';
import { NewTransactionDialog } from 'src/transactions';
import { Loader } from '@shared/ui';
import { User } from 'parse';
import { OverviewCardContainer } from './overview-card/OverviewCardContainer';

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

export class Overview extends React.Component<Props, State> {
  state: State = {
    newTransactionDialogOpen: false
  };

  render() {
    return this.props.loading ? <Loader /> : this.renderOverview();
  }

  renderOverview() {
    return (
      <div>
        {this.props.friends.map(friend => {
          return <OverviewCardContainer key={friend.id} friend={friend} />;
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
