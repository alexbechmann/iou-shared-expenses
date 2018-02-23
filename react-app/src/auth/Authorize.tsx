import * as React from 'react';
import { Tabs, Tab, Paper } from 'material-ui';

interface State {
  activeTab: number;
}

export class Authorize extends React.Component<{}, State> {
  state: State = {
    activeTab: 0
  };

  render() {
    return (
      <Paper>
        <Tabs
          value={this.state.activeTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Paper>
    );
  }

  handleChange = (event, value) => {
    this.setState({
      activeTab: value
    });
  }
}