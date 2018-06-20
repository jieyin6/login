import React from 'react'
import { Link } from 'react-router-dom'
import Head from '../components/head/head'
import List from 'antd-mobile/lib/list/index'
import InputItem from 'antd-mobile/lib/input-item/index'
import Button from 'antd-mobile/lib/button/index'
import WhiteSpace from 'antd-mobile/lib/white-space/index'
import Radio from 'antd-mobile/lib/radio/index'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/white-space/style/index.css'
import 'antd-mobile/lib/radio/style/index.css'

const RadioItem = Radio.RadioItem

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            radio: 0
        }
        //this.RadioChange = this.RadioChange.bind(this)
    }
    RadioChange (value) {
      this.setState({
          radio: value
      })
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
                    <InputItem clear placeholder="请输入用户名" >用户名</InputItem>
                    <InputItem clear placeholder="请输入密码">密码</InputItem>
                    <InputItem clear placeholder="请再次输入密码">密码</InputItem>
                    {data.map(i => {
                        <div>111</div>
                       {/* <RadioItem key={i.value} checked={radio === i.value}
                                   onChange= {()=> this.RadioChange(i.value)}
                        >{i.label}</RadioItem>
                    */}
                    })}
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='primary'>注册</Button>
                <WhiteSpace></WhiteSpace>
                <Link to='/login'>
                    <Button type='primary'>返回</Button>
                </Link>
            </div>
        )
    }
}

export default Register;