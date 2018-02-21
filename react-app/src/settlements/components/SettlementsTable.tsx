import * as React from 'react';
import { Settlement } from '@iou/core';
import { Table, TableBody, TableCell } from 'material-ui';
import TableRow from 'material-ui/Table/TableRow';

interface Props {
  settlements: Settlement[];
}

export class SettlementsTable extends React.Component<Props> {
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
