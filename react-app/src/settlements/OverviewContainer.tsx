import { getFriendsForUser } from 'src/social';
import { connect } from 'react-redux';
import { AppState } from '@shared/state';
import { Overview } from './Overview';
import { OverviewProps, OverviewDispatchProps } from './Overview';

function mapStateToProps(state: AppState): OverviewProps {
  return {
    currentUser: state.auth.currentUser,
    loading: state.social.gettingFriends,
    friends: state.social.friends
  };
}

const mapDispatchToProps: OverviewDispatchProps = { getFriendsForUser };

export const OverviewContainer = connect(mapStateToProps, mapDispatchToProps)(Overview);
