import * as React from 'react';
import { Tabs, Tab, Paper, Grid } from 'material-ui';
import { RegisterContainer } from "./RegisterContainer";
import { LoginContainer } from "./LoginContainer";

interface State {
  activeTab: number;
}

interface Props { }

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
        <Grid container={true} spacing={24} className="root container">
          <Grid item={true} xs={12}>
            {this.renderForm()}
          </Grid>
        </Grid>

      </div>
    );
  }

  renderForm() {
    switch (this.state.activeTab) {
      case 0: {
        return (
          <div>
            <LoginContainer />
          </div>
        );
      }
      case 1: {
        return (
          <RegisterContainer />
        );
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
  }
}
