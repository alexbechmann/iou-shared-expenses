import * as React from 'react';
import { Settlement, userHelper, UserProperties } from '@iou/core';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SettlementsTable } from '../SettlementsTable';
import { User } from 'parse';
import { StyleRulesCallback, Theme, WithStyles } from 'material-ui/styles';
import { RouteButton } from 'src/shared/ui/RouteButton';

export interface OverviewCardProps {
  friend: User;
  settlements: Settlement[];
}

export interface OverviewCardDispatchProps {}

type ClassNames = 'card';

export const overviewCardStyles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  }
});

interface Props extends OverviewCardProps, OverviewCardDispatchProps, WithStyles<ClassNames> {}

export class OverviewCard extends React.Component<Props> {
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
