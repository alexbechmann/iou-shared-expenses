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
import { withStyles, StyleRulesCallback, Theme, WithStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

export interface OverviewCardProps {
  friend: User;
  settlements: Settlement[];
}

export interface OverviewCardDispatchProps {
  getSettlementsToUser: (toUserId: string) => Action;
}

type ClassNames = 'card';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  }
});

interface Props extends OverviewCardProps, OverviewCardDispatchProps, WithStyles<ClassNames> {}

export class OverviewCardComponent extends React.Component<Props> {
  render() {
    return (
      <Card className={this.props.classes.card}>
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
          <Link to={`/view-transactions/${this.props.friend.id}`}>
            <Button fullWidth={true} variant="raised" color="secondary">
              View Transactions
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }

  componentDidMount() {
    this.props.getSettlementsToUser(this.props.friend.id);
  }
}

export const OverviewCard = withStyles(styles, { withTheme: true })(OverviewCardComponent);
