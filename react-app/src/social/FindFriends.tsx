import * as React from 'react';
import {
  TextField,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
  Avatar
} from '@material-ui/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { connect } from 'react-redux';
import * as Icons from '@material-ui/icons';
import { AppState } from 'src/state';
import { findUsers, setSearchText, sendFriendRequest } from 'src/social/state/social.actions';
import { Loader } from 'src/shared/ui';
import { User } from 'parse';
import { ConnectedReduxProps } from '../state/connected-redux-props';

interface Props extends ConnectedReduxProps {
  searchText: string;
  searchResults: User[];
  loading: boolean;
  sendingFriendRequests: string[];
}

export class FindFriendsComponent extends React.Component<Props> {
  private search$: Subject<string> = new Subject<string>();

  constructor(props: Props) {
    super(props);
    this.handleSearchBoxInput = this.handleSearchBoxInput.bind(this);
  }

  render() {
    return (
      <div>
        <TextField
          autoFocus={true}
          disabled={this.props.loading}
          label="Search"
          value={this.props.searchText}
          fullWidth={true}
          onChange={this.handleSearchBoxInput}
        />
        {this.renderLoadingState()}
        {this.renderResults()}
      </div>
    );
  }

  sendFriendRequest = (userId: string) => () => this.props.dispatch(sendFriendRequest(userId));

  renderResults() {
    if (this.props.searchResults && !this.props.loading) {
      return (
        <List>
          {this.props.searchResults.map(user => (
            <ListItem button={true} key={user.id}>
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/100/100" />
              </ListItemIcon>
              <ListItemText primary={user.id} />
              <ListItemSecondaryAction>
                <IconButton aria-label={'Add Friend'} color="secondary" onClick={this.sendFriendRequest(user.id)}>
                  {this.props.sendingFriendRequests.indexOf(user.id) ? <Icons.AddCircle /> : null}
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

  renderLoadingState() {
    return this.props.loading ? <Loader /> : <span />;
  }

  handleSearchBoxInput(e: any) {
    this.search$.next(e.target.value);
    this.props.dispatch(setSearchText(e.target.value));
  }

  componentDidMount() {
    this.search$
      .asObservable()
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.props.dispatch(findUsers(searchText));
      });

    this.search$.next(this.props.searchText);
  }
}

function mapStateToProps(state: AppState, prevProps: Props) {
  return {
    searchText: state.social.searchText,
    searchResults: state.social.searchResults,
    loading: state.social.findingUsers,
    sendingFriendRequests: state.social.sendingFriendRequests
  };
}

export const FindFriends = connect(mapStateToProps)(FindFriendsComponent);
