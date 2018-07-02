import * as React from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { Register } from './register/Register';
import { Login } from './login/Login';
import { RootGrid } from 'src/shared/ui';

interface State {
  activeTab: number;
}

interface Props {}

export class Authorize extends React.Component<Props, State> {
  state: State = {
    activeTab: 0
  };

  render() {
    return (
      <div>
        <Paper>
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Paper>
        <div>
          <RootGrid>{this.renderForm()}</RootGrid>
        </div>
      </div>
    );
  }

  renderForm() {
    switch (this.state.activeTab) {
      case 0: {
        return <Login />;
      }
      case 1: {
        return <Register />;
      }
      default:
        break;
    }

    return null;
  }

  handleTabChange = (event, value) => {
    this.setState({
      activeTab: value
    });
  };
}
