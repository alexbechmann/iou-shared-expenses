import * as React from 'react';
import { Tabs, Tab, Paper, Grid } from 'material-ui';
import { RegisterContainer } from './register/RegisterContainer';
import { LoginContainer } from './login/LoginContainer';

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
          <Grid container={true} spacing={24} justify="center">
            <Grid item={true} xs={12} sm={7} md={6} lg={5}>
              {this.renderForm()}
            </Grid>
          </Grid>
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
