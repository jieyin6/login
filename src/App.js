import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/login/login'
import Register from './components/register/register'
import Hello from './components/pages/registerDetail/hello'
import IndexComponent from './components/pages/index/index'


class App extends Component {
  render () {
    return (
      <div className="App">
       <Switch>
          <Route exact path='/' component={IndexComponent}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/hello" component={Hello} ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
