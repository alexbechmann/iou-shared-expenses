import * as React from 'react';
import {
  AppBar,
  MenuItem,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Badge
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import { AppState } from 'src/state';
import { User } from 'parse';
import { logout } from 'src/auth/state/auth.actions';
import { connect } from 'react-redux';

export interface AppMenuProps {
  isLoggedIn: boolean;
  friendRequestsCount: number;
}

export interface AppMenuDispatchProps {
  logout: () => Action;
}

interface Props extends AppMenuProps, AppMenuDispatchProps {}

interface State {
  showDrawer: boolean;
}

export class AppMenuComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDrawer: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleMenu} color="inherit" aria-label="Menu">
              <Icons.Menu />
            </IconButton>
            <Typography variant="title" color="inherit">
              IOU Shared Expenses
            </Typography>
          </Toolbar>
        </AppBar>
        {this.renderSideDrawer()}
      </div>
    );
  }

  toggleMenu() {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  }

  renderSideDrawer() {
    return this.props.isLoggedIn ? (
      <Drawer open={this.state.showDrawer} onClose={this.toggleMenu}>
        <Link to="/">
          <MenuItem onClick={this.toggleMenu}>
            <ListItemIcon>
              <Icons.Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
        </Link>
        <Link to="/friends">
          <MenuItem onClick={this.toggleMenu}>
            <ListItemIcon>
              <Icons.People />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </MenuItem>
        </Link>
        <Link to="/friend-requests">
          <MenuItem onClick={this.toggleMenu}>
            <ListItemIcon>
              <Badge badgeContent={this.props.friendRequestsCount} color="primary">
                <Icons.Mail />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Friend Requests" />
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={this.logout}>Logout</MenuItem>
        <Divider />
        <MenuItem onClick={this.toggleMenu}>Close</MenuItem>
      </Drawer>
    ) : (
      <Drawer open={this.state.showDrawer} onClose={this.toggleMenu}>
        <MenuItem onClick={this.toggleMenu}>Close</MenuItem>
      </Drawer>
    );
  }

  logout() {
    this.props.logout();
    this.toggleMenu();
  }
}

function mapStateToProps(state: AppState): AppMenuProps {
  return {
    isLoggedIn: state.auth.currentUser instanceof User,
    friendRequestsCount: state.social.friendRequests.length
  };
}

const mapDispatchToProps: AppMenuDispatchProps = { logout };

export const AppMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenuComponent);
