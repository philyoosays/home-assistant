import React from 'react';

import ActivateListen from './ActivateListen';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="main-container">

        <ActivateListen />
      </div>
    );
  }
}

export default App;
