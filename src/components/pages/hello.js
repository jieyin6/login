import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
         user: state.user
    }
  }
@connect(mapStateToProps)
export default class HelloComponent extends Component {
  render() {
    return (
      <div>
          {this.props.user.user ? <p>hello { this.props.user.user }</p> : <p>没有登录呀</p> } 
      </div>
    )
  }
}
