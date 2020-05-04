import React, { Component } from 'react';
import { Login } from './Login';
import { Main } from './Main';
import { proxy } from './Proxy';

export default class App extends Component {
  state = { showLogin: true };

  render() {
    return (
      <div className="app">
        {this.state.showLogin ? <Login /> : <Main />}
      </div>
    );
  }

  componentDidMount() {
    proxy.addEventListener("login", () => { this.setState({ showLogin: false }) });
  }
}

