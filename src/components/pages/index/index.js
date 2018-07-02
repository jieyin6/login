import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button, WhiteSpace, NavBar, Icon} from 'antd-mobile'
import IndexTab from '../indexTab/indexTab'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)

class IndexComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      IsLogin: ''
    }
    this.handleButton = this.handleButton.bind(this)
  }
  componentDidMount () {
    let pathArr = ['/login', '/register']
    let CurrentPath = this.props.location.pathname 
    if (pathArr.indexOf(CurrentPath) > -1) {
      return null
    }
    axios.get('/users/info').then(res => {
      if (res.data.status == '0') {
        this.props.indexIsLogin(res.data.data)
        this.setState({
          IsLogin: true
        })
      } else {
        this.props.history.push('/login')
      }
    })
  }
  
  handleButton () {
    console.log(this.props)
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        { this.state.IsLogin
        ? <div>
            <NavBar
              mode="light"
              rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />
            ]}
            >{this.props.user.type}</NavBar>
            <IndexTab></IndexTab>
          </div>
        : <div>
            <p>当前未登录</p>
            <WhiteSpace></WhiteSpace>
            <Button type='primary' onClick={this.handleButton}>登录</Button>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(IndexComponent)
