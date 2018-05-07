import { getFriendsForUser } from 'src/social';
import { connect } from 'react-redux';
import { AppState } from '@shared/state';
import { Overview, overviewStyles } from './Overview';
import { OverviewProps, OverviewDispatchProps } from './Overview';
import { withStyles } from 'material-ui';
import { combineContainers } from '@shared/combine-containers';

function mapStateToProps(state: AppState): OverviewProps {
  return {
    currentUser: state.auth.currentUser,
    loading: state.social.gettingFriends,
    friends: state.social.friends
  };
}

const mapDispatchToProps: OverviewDispatchProps = { getFriendsForUser };

export const OverviewContainer = combineContainers(Overview, [
  c => withStyles(overviewStyles, { withTheme: true })(c),
  c => connect(mapStateToProps, mapDispatchToProps)(c)
]);
