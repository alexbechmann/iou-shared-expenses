import * as React from 'react';
import './styles/main.css';
import 'typeface-roboto';
import { LinearProgress } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Action } from 'redux';
import { RootGrid } from 'src/shared/ui';
import { connect } from 'react-redux';
import { AppState } from 'src/state';
import { AppMenu } from 'src/menu/AppMenu';
import FindFriends from 'src/social/FindFriends';
import FriendRequests from 'src/social/FriendRequests';
import ViewTransactions from 'src/transactions/view/ViewTransactions';
import Overview from 'src/settlements/Overview';
import EditTransaction from './transactions/edit/EditTransaction';
import { Authorize } from 'src/auth/Authorize';
import { initParseSDK } from 'src/parse/state/parse.actions';

export interface AppProps {
  currentUser: any;
  parseInitialized: boolean;
}

export interface AppDispatchProps {
  initParseSDK: () => Action;
}

interface Props extends AppProps, AppDispatchProps {}

export class AppComponent extends React.Component<Props> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppMenu />
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
            <Route exact={true} path="/transactions/:id?/:new?/:type?" component={EditTransaction} />
            <Route exact={true} path="/view-transactions/:toUserId" component={ViewTransactions} />
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

function mapStateToProps(state: AppState): AppProps {
  return {
    currentUser: state.auth.currentUser,
    parseInitialized: state.parse.initialized
  };
}

const mapDispatchToProps: AppDispatchProps = { initParseSDK };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
