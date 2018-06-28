import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button, WhiteSpace, NavBar, Icon} from 'antd-mobile'
import IndexTab from './indexTab/indexTab'

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
    let indexPage =  () => {
      return 
    }
    return (
      <div>
        
        {this.props.user.isLogin && this.props.user.user 
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
