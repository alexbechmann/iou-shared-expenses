import * as React from 'react';
import { Settlement, userHelper, UserProperties } from '@iou/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SettlementsTable } from '../SettlementsTable';
import { User } from 'parse';
import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { RouteButton } from 'src/shared/ui/RouteButton';
import { getSettlementsToUser } from 'src/settlements/state/settlements.actions';
import { AppState } from 'src/state';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

export interface ConnectProps {
  friend: User;
  settlements: Settlement[];
}

export interface DispatchProps {
  getSettlementsToUser: (toUserId: string) => any;
}

type ClassNames = 'card';

export const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  }
});

interface Props extends ConnectProps, DispatchProps, WithStyles<ClassNames> {}

export class OverviewCardComponent extends React.Component<Props> {
  render() {
    const userProperties: UserProperties = userHelper.getUserProperties(this.props.friend);
    return (
      <Card className={this.props.classes.card}>
        <CardHeader
          avatar={<Avatar>{userProperties.initials}</Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={userProperties.displayName}
        />
        <CardContent>
          <SettlementsTable friend={this.props.friend} />
        </CardContent>
        <CardActions>
          <RouteButton
            fullWidth={true}
            variant="raised"
            color="secondary"
            to={`/view-transactions/${this.props.friend.id}`}
          >
            View Transactions
          </RouteButton>
        </CardActions>
      </Card>
    );
  }
}

export interface OverviewCardProps {
  friend: User;
}

function mapStateToProps(state: AppState, ownProps: OverviewCardProps): ConnectProps {
  return {
    friend: ownProps.friend,
    settlements: state.settlements.allSettlements.filter(
      settlement => settlement.fromUserId === state.auth.currentUser!.id && settlement.toUserId === ownProps.friend.id
    )
  };
}

const mapDispatchToProps: DispatchProps = { getSettlementsToUser };

export const OverviewCard = combineContainers(OverviewCardComponent, [
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
]);
