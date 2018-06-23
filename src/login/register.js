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
            radio: 0,
            user:'',
            pwd:'',
            pwd2:''
        }
        //this.RadioChange = this.RadioChange.bind(this)
        this.registerEvent = this.registerEvent.bind(this)
        this.isNamed = this.isNamed.bind(this)
    }
    RadioChange (value) {
      this.setState({
          radio: value
      })
    }
    inputChange(type, value) {
        this.setState({
            [type]: value
        })
        const {user, pwd, pwd2} = this.state
        if(user) {
            this.isNamed(user)
        }
        if(pwd && pwd2 && pwd === pwd2) {
            Toast.info('密码不一致', 1);
        }
    }
    isNamed (user) {
        axios.get('/users/isnamed',user).then(res => {
            if(res.data.status === 1) {
                Toast.info('该用户名已被注册', 1)
            }
        })
    }
    registerEvent () {
        const {user, pwd, pwd2} = this.state
        console.log(user,pwd,pwd2)
        if(user && pwd && pwd2 && pwd == pwd2) {
            this.props.Register(user, pwd)
        }else{
            Toast.info('请正确输入', 1)
        }
    }
    render () {
        const { radio } = this.state;
        const data = [
            {value: 0, label: '学生'},
            {value: 1, label: '社会人士'}
        ]
        return (
            <div>
                <Head></Head>
                <List>
                    <InputItem clear placeholder="请输入用户名" onChange={w => this.inputChange('user', w)} >用户名</InputItem>
                    <InputItem clear placeholder="请输入密码" onChange={w => this.inputChange('pwd', w)}>密码</InputItem>
                    <InputItem clear placeholder="请再次输入密码" onChange={w => this.inputChange('pwd2', w)}>密码</InputItem>
                    {data.map(i => {
                        <div>111</div>
                       {/* <RadioItem key={i.value} checked={radio === i.value}
                                   onChange= {()=> this.RadioChange(i.value)}
                        >{i.label}</RadioItem>
                    */}
                    })}
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={this.registerEvent}>注册</Button>
                <WhiteSpace></WhiteSpace>
                <Link to='/login'>
                    <Button type='primary'>返回</Button>
                </Link>
                { this.props.user.isLogin ? <Redirect to='/hello'></Redirect> : null }
            </div>
        )
    }
}

export default  withRouter(RegisterComponent);