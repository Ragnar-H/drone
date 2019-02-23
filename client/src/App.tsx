import React, { Component } from 'react';
import { SocketStatus } from './SocketStatus';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <SocketStatus />
      </div>
    );
  }
}

export default App;
