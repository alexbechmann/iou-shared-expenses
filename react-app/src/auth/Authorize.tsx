import * as React from 'react';
import { Tabs, Tab, Paper } from 'material-ui';
import { RegisterContainer } from './register/RegisterContainer';
import { LoginContainer } from './login/LoginContainer';
import { RootGrid } from '@shared/ui';

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
        return <LoginContainer />;
      }
      case 1: {
        return <RegisterContainer />;
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
