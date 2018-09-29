import * as React from 'react';
import './App.css';
import Transactions from './transactions/Transactions';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Transactions />
      </div>
    );
  }
}

export default App;
