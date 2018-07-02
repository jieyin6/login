import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { indexIsLogin } from '../../redux/redux'
@withRouter
@connect(
  null,
  {indexIsLogin}
)
export default class AuthRoute extends Component {
  componentDidMount () {
    let pathArr = ['/login', '/register']
    let CurrentPath = this.props.location.pathname 
    if (pathArr.indexOf(CurrentPath) > -1) {
      return null
    }
    axios.get('/users/info').then(res => {
      if (res.data.status == '0') {
        this.props.indexIsLogin(res.data.data)
      } else {
        this.props.history.push('/login')
      }
    })
  }
  render() {
    return null
  }
}
