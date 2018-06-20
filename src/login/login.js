import React from 'react'
import { Link } from 'react-router-dom'
import Head from '../components/head/head'
import List from 'antd-mobile/lib/list/index'
import InputItem from 'antd-mobile/lib/input-item/index'
import Button from 'antd-mobile/lib/button/index'
import WhiteSpace from 'antd-mobile/lib/white-space/index'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/white-space/style/index.css'
import { login } from '../redux/redux'
import { connect } from 'react-redux'

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props),
        this.state = {
            user: '',
            pwd: ''
        },
        this.login = this.login.bind(this)
    }
    inputChange (type, value) {
        console.log(value)
        this.setState({
            [type]: value
        })
    }
    login () {
        console.log(this.state)
        this.props.login(this.state)
    }
    render () {
        return (
            <div>
                <Head></Head>
                <List>
                    <InputItem clear placeholder="请输入用户名" onChange={w => this.inputChange('user', w)}>用户名</InputItem>
                    <InputItem clear placeholder="请输入密码" onChange={w => this.inputChange('pwd', w)}>密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={this.login} >登录</Button>
                <WhiteSpace></WhiteSpace>
                <Link to='/register'>
                    <Button type='primary'>注册</Button>
                </Link>
            </div>
        )
    }
}

export default Login;