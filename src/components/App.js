import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import '../assets/styles/App.css';
import MapView from './MapView';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/main" component={MapView} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
