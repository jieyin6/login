import React from 'react'
import { Link, withRouter, Redirect} from 'react-router-dom'
import Head from '../components/head/head'
import { Button, WhiteSpace, List, InputItem, Toast } from 'antd-mobile'
import { Login } from '../redux/redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
         user: state.user,
         isLogin: state.isLogin
    }
  }

@connect(
    mapStateToProps,
    {Login}
)
class LoginComponent extends React.Component{
    constructor(props){
        super(props),
        this.state = {
            user: '',
            pwd: ''
        }
        this.login = this.login.bind(this)
    }
    componentDidMount () {
        //console.log(this.props.user, this.props.isLogin)
    }
    inputChange (type, value) {
        console.log(value)
        this.setState({
            [type]: value
        })
    }
    login () {
        console.log(this.state)
        this.props.Login(this.state.user,this.state.pwd)
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
                {this.props.user.isLogin ? <Redirect to='/hello'></Redirect>: null}
            </div>
        )
    }
}

export default withRouter(LoginComponent);