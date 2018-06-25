import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button, WhiteSpace} from 'antd-mobile'
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)

class IndexComponent extends Component {
  constructor (props) {
    super(props)
    this.handleButton = this.handleButton.bind(this)
  }
  handleButton () {
    console.log(this.props)
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        {this.props.user.isLogin && this.props.user.user 
        ? <p>欢迎回来 {this.props.user.user}</p>
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
