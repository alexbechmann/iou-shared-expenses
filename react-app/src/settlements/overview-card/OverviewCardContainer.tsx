import { connect } from 'react-redux';
import { OverviewCard, OverviewCardProps, OverviewCardDispatchProps, overviewCardStyles } from './OverviewCard';
import { User } from 'parse';
import { AppState } from 'src/state';
import { getSettlementsToUser } from '../state/settlements.actions';
import { withStyles } from 'material-ui';
import { combineContainers } from 'combine-containers';

export interface OverviewContainerProps {
  friend: User;
}

function mapStateToProps(state: AppState, ownProps: OverviewContainerProps): OverviewCardProps {
  return {
    friend: ownProps.friend,
    settlements: state.settlements.allSettlements.filter(
      settlement => settlement.fromUserId === state.auth.currentUser!.id && settlement.toUserId === ownProps.friend.id
    )
  };
}

const mapDispatchToProps: OverviewCardDispatchProps = { getSettlementsToUser };

export const OverviewCardContainer = combineContainers(OverviewCard, [
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(overviewCardStyles, { withTheme: true })
]);
