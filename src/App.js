import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Login from './login/login'
import Register from './login/register'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    );
  }
}

export default App;
