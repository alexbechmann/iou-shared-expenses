import * as React from 'react';
import { Settlement } from '@iou/core';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { User } from 'parse';
import { AppState } from 'src/state';
import { getSettlementsToUser } from 'src/settlements/state/settlements.actions';
import { connect } from 'react-redux';

interface SettlementsTableDispatchProps {
  getSettlementsToUser: (toUserId: string) => any;
}

interface SettlementsTableProps {
  friend: User;
}

interface SettlementsTableComponentProps extends SettlementsTableProps {
  settlements: Settlement[];
}

interface Props extends SettlementsTableDispatchProps, SettlementsTableProps, SettlementsTableComponentProps {}

export class SettlementsTableComponent extends React.Component<Props> {
  componentDidMount() {
    this.props.getSettlementsToUser(this.props.friend.id);
  }

  render() {
    return (
      <Table>
        <TableBody>
          {this.props.settlements.map(settlement => {
            return (
              <TableRow key={settlement.currency.id}>
                <TableCell>{settlement.currency.name}</TableCell>
                <TableCell>{settlement.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state: AppState, ownProps: SettlementsTableProps): SettlementsTableComponentProps {
  return {
    friend: ownProps.friend,
    settlements: state.settlements.allSettlements.filter(
      settlement => settlement.fromUserId === state.auth.currentUser!.id && settlement.toUserId === ownProps.friend.id
    )
  };
}

const mapDispatchToProps: SettlementsTableDispatchProps = { getSettlementsToUser };

export const SettlementsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettlementsTableComponent);
