import React from 'react';

import ActivateListen from './ActivateListen';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speechResults: 'HELIOS'
    };

    this.setTheState = this.setTheState.bind(this);
  }

  setTheState(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div className="main-container">
        <p style={{color:'white'}}>{this.state.speechResults}</p>
        <ActivateListen setParentState={ this.setTheState }/>
      </div>
    );
  }
}

export default App;
