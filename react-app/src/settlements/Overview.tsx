import * as React from 'react';
import { connect } from "react-redux";
import { Action } from "redux";
import { AppState } from "@shared/index";
import { getSettlementOverviews } from "./settlements.actions";
import { SettlementOverview } from '@iou/core';
import { CircularProgress, withStyles, Button } from 'material-ui';
import { OverviewCard } from './components/OverviewCard';
import { StyleRulesCallback, Theme } from 'material-ui/styles';
import * as Icons from 'material-ui-icons';
import { WithStyles } from 'material-ui/styles/withStyles';
import { NewTransactionDialog } from 'src/transactions';

type ClassNames = | 'actionButton';
// | 'content';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  actionButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

interface Props extends WithStyles<ClassNames> {
  currentUser: any;
  loading: boolean;
  overviews: SettlementOverview[];
  getSettlementOverviews: () => Action;
}

interface State {
  newTransactionDialogOpen: boolean;
}

class OverviewComponent extends React.Component<Props, State> {
  state: State = {
    newTransactionDialogOpen: false
  };

  render() {
    return this.props.loading ? this.renderLoading() : this.renderOverview();
  }

  renderOverview() {
    return (
      <div>
        {this.props.overviews.map(overview => {
          return (
            <OverviewCard key={overview.user.id} overview={overview} />
          );
        })}
        <Button variant="fab" className={this.props.classes.actionButton} color="primary" onClick={this.openNewTransactionDialog}>
          <Icons.Add />
        </Button>
        <NewTransactionDialog open={this.state.newTransactionDialogOpen} handleClose={this.closeNewTransactionDialog}/>
      </div>
    );
  }

  renderLoading() {
    return <CircularProgress />;
  }

  componentDidMount() {
    this.props.getSettlementOverviews();
  }

  openNewTransactionDialog = () => {
    this.setState({ newTransactionDialogOpen: true });
  }

  closeNewTransactionDialog = () => {
    this.setState({ newTransactionDialogOpen: false });
  }
}

function mapStateToProps(state: AppState, prevProps: any) {
  return {
    currentUser: state.auth.currentUser,
    loading: state.settlements.gettingSettlements,
    overviews: state.settlements.overviews
  };
}

export const Overview = withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { getSettlementOverviews })(OverviewComponent)
);
