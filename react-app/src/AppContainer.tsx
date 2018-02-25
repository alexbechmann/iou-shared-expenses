import { connect } from 'react-redux';
import { initParseSDK } from 'src/parse';
import { AppState } from 'src/shared';
import { AppProps, App, AppDispatchProps } from 'src/App';

function mapStateToProps(state: AppState): AppProps {
  return {
    currentUser: state.auth.currentUser,
    parseInitialized: state.parse.initialized
  };
}

const mapDispatchToProps: AppDispatchProps = { initParseSDK };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
