import React from 'react';

import ActivateListen from './ActivateListen';
import GoFetch from './utilities/GoFetch';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speechResults: 'HELIOS',
      presence: '',
    };

    this.setTheState = this.setTheState.bind(this);
  }

  async componentDidMount() {
    let result = await GoFetch('GET', '/api/ping')
    this.setState({
      presence: result
    })
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
        <p style={{color: 'white'}}>{this.state.presence}</p>
        <ActivateListen setParentState={ this.setTheState }/>
      </div>
    );
  }
}

export default App;
