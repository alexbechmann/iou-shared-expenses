import * as React from 'react';
import './styles/main.css';
import 'typeface-roboto';
import { LinearProgress } from 'material-ui';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Action } from 'redux';
import { FindFriends, FriendRequests } from 'src/social';
import { Overview } from 'src/settlements';
import { Authorize } from 'src/auth';
import { AppMenuContainer } from 'src/menu';
import { EditTransactionContainer } from 'src/transactions';
import { RootGrid } from '@shared/ui';

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
        <RootGrid>
          <Switch>
            <Route exact={true} path="/friends" component={FindFriends} />
            <Route exact={true} path="/friend-requests" component={FriendRequests} />
            <Route exact={true} path="/transactions/:type/:id?" component={EditTransactionContainer} />
            <Route path="/" component={Overview} />
          </Switch>
        </RootGrid>
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
