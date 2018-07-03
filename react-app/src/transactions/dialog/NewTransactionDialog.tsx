import * as React from 'react';
import Button from '@material-ui/core/Button';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  withMobileDialog,
  Dialog
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TransactionType } from '@iou/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { WithWidthProps } from '@material-ui/core/withWidth';

interface Props {
  handleClose: () => void;
  open: boolean;
}

class NewTransactionDialogComponent extends React.Component<Props & DialogProps & WithWidthProps> {
  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">New Transaction</DialogTitle>
          <DialogContent>
            <DialogContentText>Choose a transaction type to get started.</DialogContentText>
            <List component="nav">
              <ListItem
                button={true}
                component={props => <Link to={`/transactions/new/${TransactionType.IOU}`}>{props.children}</Link>}
              >
                <ListItemIcon>
                  <Icon>note</Icon>
                </ListItemIcon>
                <ListItemText primary="I Owe You" />
              </ListItem>
              <ListItem button={true} component={props => <Link to="#">{props.children}</Link>}>
                <ListItemIcon>
                  <Icon>receipt</Icon>
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>
              <ListItem
                button={true}
                component={props => <Link to={`/transactions/new/${TransactionType.Payment}`}>{props.children}</Link>}
              >
                <ListItemIcon>
                  <Icon>payment</Icon>
                </ListItemIcon>
                <ListItemText primary="Payment" />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const NewTransactionDialog = withMobileDialog<Props>()(NewTransactionDialogComponent);
