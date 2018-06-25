import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {List, InputItem, Button, WhiteSpace, TextareaItem, Toast} from 'antd-mobile'
import { Update } from '../../redux/redux'
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
@connect(mapStateToProps, {Update})
export default class HelloComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: '',
      company: '',
      salary: '',
      request: '',
      job: '',
      mine: ''
    }
    this.updateButton = this.updateButton.bind(this)
  }
  inputChange (type, value) {
    this.setState({
      [type]: value
    })
  }
  updateButton () {
    let {position, company, salary, request, job, mine} = this.state
    if ( job && company && salary && request || job && position && salary && mine ) {
      this.props.Update(this.state, this.props.user.user)
    } else {
      Toast.info('请输入完整信息')
    }
    
  }
  render() {
    return (
      <div>
        {  !this.props.user.user ? <p>没有登录呀</p>  : 
        <div>
          <p>hello { this.props.user.user } 请完善你的信息</p>  
          {this.props.user.type === 'boss' && this.props.user.user ?  
          <List>
          <InputItem clear placeholder="招聘职位" onChange={w => this.inputChange('job', w)}>招聘职位</InputItem>
          <InputItem clear placeholder="公司信息" onChange={w => this.inputChange('company', w)}>公司信息</InputItem>
          <InputItem clear placeholder="薪资范围" onChange={w => this.inputChange('salary', w)}>薪资范围</InputItem>
          <InputItem clear placeholder="职位要求" onChange={w => this.inputChange('request', w)}>职位要求</InputItem>
          </List>
          :
          <List>
          <InputItem clear placeholder="应聘职位" onChange={w => this.inputChange('job', w)}>应聘职位</InputItem>
          <InputItem clear placeholder="工作地点" onChange={w => this.inputChange('position', w)}>工作地点</InputItem>
          <InputItem clear placeholder="薪资范围" onChange={w => this.inputChange('salary', w)}>薪资范围</InputItem>
          <TextareaItem rows={3} placeholder="个人简介" onChange={w => this.inputChange('mine', w)}>个人简介</TextareaItem>
          </List>
          }
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.updateButton} type='primary'>完成</Button>
        </div> 
        }
        <WhiteSpace></WhiteSpace>
        <div>{this.props.user.isUpdate}</div>
        {this.props.user.isUpdate == true ? <Redirect to='/'></Redirect> : null}
        { this.props.user.msg == '更新失败' ? <div>更新失败</div> : null}
      </div>
    )
  }
}
