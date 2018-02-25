import { AppState } from 'src/shared';
import { connect } from 'react-redux';
import { logout } from 'src/auth';
import { AppMenu, AppMenuProps, AppMenuDispatchProps } from './AppMenu';

function mapStateToProps(state: AppState): AppMenuProps {
  return {
    isLoggedIn: state.auth.currentUser,
    friendRequestsCount: state.social.friendRequests.length
  };
}

const mapDispatchToProps: AppMenuDispatchProps = { logout };

export const AppMenuContainer = connect(mapStateToProps, mapDispatchToProps)(AppMenu);
