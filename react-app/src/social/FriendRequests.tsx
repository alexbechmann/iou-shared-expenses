import * as React from 'react';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { connect } from 'react-redux';
import { User } from 'parse';
import { AppState } from 'src/state';
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  ListItemIcon
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { acceptFriendRequest, getFriendRequests } from 'src/social/state/social.actions';
import { FriendRequest } from '@iou/core';
import { Loader } from 'src/shared/ui';
import { ConnectedReduxProps } from 'src/state/connected-redux-props';

interface Props extends ConnectedReduxProps {
  acceptingFriendRequests: string[];
  friendRequests: FriendRequest[];
  loading: boolean;
  currentUser: User;
}

export class FriendRequestsComponent extends React.Component<Props> {
  render() {
    return <div>{this.renderResults()}</div>;
  }

  componentWillMount() {
    this.props.dispatch(getFriendRequests(this.props.currentUser.id));
  }

  acceptFriendRequest = (userId: string) => () => this.props.dispatch(acceptFriendRequest(userId));

  renderResults() {
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.friendRequests) {
      return (
        <List>
          {this.props.friendRequests.map((friendRequest: FriendRequest) => (
            <ListItem button={true} key={friendRequest.getFromUser().id}>
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/100/100" />
              </ListItemIcon>
              <ListItemText primary={friendRequest.getFromUser().id} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label={'Add Friend'}
                  color="secondary"
                  onClick={this.acceptFriendRequest(friendRequest.getFromUser().id)}
                >
                  {this.props.acceptingFriendRequests.indexOf(friendRequest.getFromUser().id) ? (
                    <Icons.AddCircle />
                  ) : null}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
    } else {
      return <span />;
    }
  }
}

function mapStateToProps(state: AppState, prevProps: Props) {
  return {
    acceptingFriendRequests: state.social.acceptingFriendRequests,
    friendRequests: state.social.friendRequests,
    loading: state.social.gettingFriendRequests,
    currentUser: state.auth.currentUser
  };
}

export const FriendRequests = connect(
  mapStateToProps,
  { acceptFriendRequest, getFriendRequests }
)(FriendRequestsComponent);
