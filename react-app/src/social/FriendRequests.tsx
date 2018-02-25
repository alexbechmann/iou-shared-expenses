import * as React from 'react';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { connect } from 'react-redux';
import { User } from 'parse';
import { AppState } from '@shared/index';
import { List, ListItem, Avatar, ListItemText, IconButton, ListItemSecondaryAction, ListItemIcon, CircularProgress } from 'material-ui';
import * as Icons from 'material-ui-icons';
import { Action } from 'redux';
import { acceptFriendRequest, getFriendRequests } from 'src/social';
import { FriendRequest } from '@shared/schema';

interface Props {
  acceptingFriendRequests: string[];
  friendRequests: FriendRequest[];
  loading: boolean;
  acceptFriendRequest: (userId: string) => Action;
  getFriendRequests: (currentUserId: string) => Action;
  currentUser: User;
}

export class FriendRequestsComponent extends React.Component<Props> {
  render() {
    return <div>{this.renderResults()}</div>;
  }

  componentWillMount() {
    this.props.getFriendRequests(this.props.currentUser.id);
  }

  renderResults() {
    if (this.props.loading) {
      return <CircularProgress />;
    } else if (this.props.friendRequests) {
      console.log(this.props.friendRequests);
      return (
        <List>
          {this.props.friendRequests.map((friendRequest: FriendRequest) => (
            <ListItem button={true} key={friendRequest.fromUser.id}>
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/100/100" />
              </ListItemIcon>
              <ListItemText primary={friendRequest.fromUser.id} />
              <ListItemSecondaryAction>
                <IconButton aria-label={'Add Friend'} color="secondary" onClick={() => this.props.acceptFriendRequest(friendRequest.fromUser.id)}>
                  {this.props.acceptingFriendRequests.indexOf(friendRequest.fromUser.id) ? <Icons.AddCircle /> : null}
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

export const FriendRequests = connect(mapStateToProps, { acceptFriendRequest, getFriendRequests })(FriendRequestsComponent);
