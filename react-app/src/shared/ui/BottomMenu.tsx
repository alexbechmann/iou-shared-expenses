import * as React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Paper from '@material-ui/core/Paper';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

interface State {
  value: number;
}

export class BottomMenu extends React.Component<any, State> {
  state = {
    value: 0
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Paper>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels={true}>
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    );
  }
}
