import { connect } from 'react-redux';
import { OverviewCard, OverviewCardProps, OverviewCardDispatchProps, overviewCardStyles } from './OverviewCard';
import { User } from 'parse';
import { AppState } from '@shared/state';
import { getSettlementsToUser } from '../settlements.actions';
import { combineContainers } from '@shared/combine-containers';
import { withStyles } from 'material-ui';

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

export const OverviewCardContainer: React.ComponentClass<OverviewContainerProps> = combineContainers(OverviewCard, [
  c => connect(mapStateToProps, mapDispatchToProps)(c),
  c => withStyles(overviewCardStyles, { withTheme: true })(c)
]);
