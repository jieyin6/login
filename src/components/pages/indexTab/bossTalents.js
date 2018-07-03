import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getIndexList } from '../../../redux/index.redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    list: state.indexReducer
  }
}
@connect(
    mapStateToProps,
    { getIndexList }
)

export default class BossTalents extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        let type = this.props.user.type == 'boss' ? 'talents' : 'boss'
        this.props.getIndexList(type)
    }
    render() {
        console.log(this.props.list.indexList)
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                {this.props.list.indexList.map(item => (
                <div>
                    <Card>
                        <Card.Header 
                            title={item.user}
                            extra={item.job} />
                        <Card.Body>
                            { this.props.user.type == 'boss' 
                                ? <div>{item.mine}</div>
                                : <div>{item.request}</div>
                            }
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>
                </div>
                ))}
            </WingBlank>
        )
    }
}