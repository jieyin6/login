import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Register } from '../redux/redux'
import Head from '../components/head/head'
import Hello from '../components/pages/hello'
import axios from 'axios'
import {List, InputItem, Button, WhiteSpace, Radio, Toast} from 'antd-mobile'
import { connect } from 'react-redux'

const RadioItem = Radio.RadioItem

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }
@connect(
   mapStateToProps,
   { Register }
)
class RegisterComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            radio: 'talents',
            user:'',
            pwd:'',
            pwd2:''
        }
        this.registerEvent = this.registerEvent.bind(this)
    }
    RadioChange (value) {
      this.setState({
          radio: value
      })
    }
    inputChange (type, value) {
        this.setState({
            [type]: value
        })
        const {user, pwd, pwd2} = this.state
        if (user) {
            this.isNamed(user)
        }
        if (pwd && pwd2 && pwd === pwd2) {
            Toast.info('密码不一致', 1);
        }
    }
    /*isNamed (user) {
        axios.get('/users/isnamed',user).then(res => {
            if(res.data.status === 1) {
                Toast.info('该用户名已被注册', 1)
            }
        })
    }*/
    registerEvent () {
        const {user, pwd, pwd2, radio} = this.state
        console.log(user, pwd, pwd2)
        if (user && pwd && pwd2 && pwd == pwd2) {
            this.props.Register(user, pwd, radio)
        }else{
            Toast.info('请正确输入', 1)
        }
    }
    RadioChange () {
        if(this.state.radio === 'boss') {
            this.setState({
                radio: 'talents'
            })
        } else {
          this.setState({
              radio: 'boss'
          })   
        }
    }
    render () {
        const { radio } = this.state;
        return (
            <div>
                <Head></Head>
                <List>
                    <InputItem clear placeholder="请输入用户名" onChange={w => this.inputChange('user', w)} >用户名</InputItem>
                    <InputItem clear placeholder="请输入密码" onChange={w => this.inputChange('pwd', w)}>密码</InputItem>
                    <InputItem clear placeholder="请再次输入密码" onChange={w => this.inputChange('pwd2', w)}>密码</InputItem>
                    <RadioItem checked={radio === 'talents' } onChange= {()=> this.RadioChange()}>talents</RadioItem>
                    <RadioItem checked={radio === 'boss'} onChange={ () => this.RadioChange()} >boss</RadioItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={this.registerEvent}>注册</Button>
                <WhiteSpace></WhiteSpace>
                <Link to='/login'>
                    <Button type='primary'>返回</Button>
                </Link>
                <WhiteSpace></WhiteSpace>
                { this.props.user.isLogin ? <Redirect to='/hello'></Redirect> : null }
                { this.props.user.msg == '该用户名已被注册' ? <div>该用户名已被注册</div> : null }
            </div>
        )
    }
}

export default withRouter(RegisterComponent);