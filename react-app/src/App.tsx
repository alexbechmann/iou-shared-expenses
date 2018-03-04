import * as React from 'react';
import './styles/main.css';
import 'typeface-roboto';
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Action } from 'redux';
import { FindFriends, FriendRequests } from 'src/social';
import { Overview } from 'src/settlements';
import { Authorize } from 'src/auth';
import { AppMenuContainer } from 'src/menu';
import { EditTransactionContainer } from 'src/transactions';

export interface AppProps {
  currentUser: any;
  parseInitialized: boolean;
}

export interface AppDispatchProps {
  initParseSDK: () => Action;
}

interface Props extends AppProps, AppDispatchProps {}

export class App extends React.Component<Props> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppMenuContainer />
          {this.renderApp()}
        </div>
      </BrowserRouter>
    );
  }

  renderApp() {
    if (this.props.currentUser) {
      return (
        <Grid container={true} spacing={24} className="root container" justify="center">
          <Grid item={true} xs={12} sm={7} md={6} lg={5}>
            <Switch>
              <Route exact={true} path="/friends" component={FindFriends} />
              <Route exact={true} path="/friend-requests" component={FriendRequests} />
              <Route exact={true} path="/transactions/:type/:id?" component={EditTransactionContainer} />
              <Route path="/" component={Overview} />
            </Switch>
          </Grid>
        </Grid>
      );
    } else if (this.props.parseInitialized) {
      return <Authorize />;
    } else {
      return (
        <div>
          <LinearProgress variant="query" />
          <br /> <br />
          Initializing Parse SDK
        </div>
      );
    }
  }

  componentDidMount() {
    if (!this.props.parseInitialized) {
      this.props.initParseSDK();
    }
  }
}
