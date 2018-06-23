import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Login from './login/login'
import Register from './login/register'
import Hello from './components/pages/hello'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/hello" component={Hello} ></Route>
      </div>
    );
  }
}

export default App;
