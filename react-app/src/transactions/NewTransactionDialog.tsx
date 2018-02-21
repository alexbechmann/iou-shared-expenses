import * as React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  DialogProps,
} from 'material-ui/Dialog';
import { WithWidthProps } from 'material-ui/utils/withWidth';
import { List, ListItem, ListItemIcon, ListItemText, Icon } from 'material-ui';
import { Link } from 'react-router-dom';

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
            <DialogContentText>
              Choose a transaction type to get started.
            </DialogContentText>
            <List component="nav">
              <ListItem button={true} component={props => <Link to="/transactions/iou/new" {...props}/>}>
                <ListItemIcon>
                  <Icon>note</Icon>
                </ListItemIcon>
                <ListItemText primary="I Owe You" />
              </ListItem>
              <ListItem button={true} component={props => <Link to="/transactions/purchase/new" {...props}/>}>
                <ListItemIcon>
                  <Icon>receipt</Icon>
                </ListItemIcon>
                <ListItemText primary="Purchase" />
              </ListItem>
              <ListItem button={true} component={props => <Link to="/transactions/payment/new" {...props}/>}>
                <ListItemIcon>
                  <Icon>payment</Icon>
                </ListItemIcon>
                <ListItemText primary="Payment" />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary" autoFocus={true}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const NewTransactionDialog = withMobileDialog<Props>()(NewTransactionDialogComponent);
