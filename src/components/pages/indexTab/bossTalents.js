import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
@connect(mapStateToProps)

export default class BossTalents extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>boos index</div>
        )
    }
}