import * as React from 'react';
import { SettlementOverview } from '@iou/core';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { Button } from 'material-ui';
import { SettlementsTable } from './SettlementsTable';

interface Props {
  overview: SettlementOverview;
}

export class OverviewCard extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.overview.user.id}
        />
        <CardContent>
          <SettlementsTable settlements={this.props.overview.settlements}/>
        </CardContent>
        <CardActions>
          <Button fullWidth={true} variant="raised" color="secondary">
            View Transactions
          </Button>
        </CardActions>
      </Card>
    );
  }
}
