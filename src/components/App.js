import React, { Component } from 'react';
import '../assets/styles/App.css';
import MapView from './MapView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapView />
      </div>
    );
  }
}

export default App;
