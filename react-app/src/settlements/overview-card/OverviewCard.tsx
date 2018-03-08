import * as React from 'react';
import { Settlement } from '@iou/core';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { Button } from 'material-ui';
import { SettlementsTable } from '../components/SettlementsTable';
import { User } from 'parse';
import { Action } from 'redux';

export interface OverviewCardProps {
  friend: User;
  settlements: Settlement[];
}

export interface OverviewCardDispatchProps {
  getSettlementsToUser: (toUserId: string) => Action;
}

interface Props extends OverviewCardProps, OverviewCardDispatchProps {}

export class OverviewCard extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader
          avatar={<Avatar>R</Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.friend.id}
        />
        <CardContent>
          <SettlementsTable settlements={this.props.settlements} />
        </CardContent>
        <CardActions>
          <Button fullWidth={true} variant="raised" color="secondary">
            View Transactions
          </Button>
        </CardActions>
      </Card>
    );
  }

  componentDidMount() {
    this.props.getSettlementsToUser(this.props.friend.id);
  }
}
