import * as React from 'react';
import {
  TextField,
  CircularProgress,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
  Avatar
} from 'material-ui';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { connect } from 'react-redux';
import { User } from 'parse';
import * as Icons from 'material-ui-icons';
import { Action } from 'redux';
import { AppState } from '@shared/index';
import { findUsers, setSearchText, sendFriendRequest } from 'src/social/social.actions';

interface Props {
  findUsers: (searchText: string) => Action;
  setSearchText: (searchText: string) => Action;
  sendFriendRequest: (user: string) => Action;
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
                <IconButton
                  aria-label={'Add Friend'}
                  color="secondary"
                  onClick={() => this.props.sendFriendRequest(user.id)}
                >
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
    return this.props.loading ? <CircularProgress /> : <span />;
  }

  handleSearchBoxInput(e: any) {
    this.search$.next(e.target.value);
    this.props.setSearchText(e.target.value);
  }

  componentDidMount() {
    this.search$
      .asObservable()
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.props.findUsers(searchText);
      });

    this.search$.next(this.props.searchText);
  }
}

function mapStateToProps(state: AppState, prevProps: Props) {
  return {
    searchText: state.social.searchText,
    searchResults: state.social.searchResults,
    loading: state.social.loading,
    sendingFriendRequests: state.social.sendingFriendRequests
  };
}

export const FindFriends = connect(mapStateToProps, {
  findUsers,
  setSearchText,
  sendFriendRequest
})(FindFriendsComponent);
