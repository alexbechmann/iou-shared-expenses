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

interface NewTransactionDialogProps {
  handleClose: () => void;
  open: boolean;
}

interface Props extends NewTransactionDialogProps, DialogProps, WithWidthProps {}

class NewTransactionDialog extends React.Component<Props> {
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
              <ListItem button={true} component={this.linkComponent(`/transactions/new/${TransactionType.IOU}`)}>
                <ListItemIcon>
                  <Icon>note</Icon>
                </ListItemIcon>
                <ListItemText primary="I Owe You" />
              </ListItem>
              <ListItem button={true} component={this.linkComponent('#')}>
                <ListItemIcon>
                  <Icon>receipt</Icon>
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>
              <ListItem button={true} component={this.linkComponent(`/transactions/new/${TransactionType.Payment}`)}>
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

  linkComponent(to: string) {
    return (props: any) => <Link to={to}>{props.children}</Link>;
  }
}

export default withMobileDialog()(NewTransactionDialog) as React.ComponentType<NewTransactionDialogProps>;
