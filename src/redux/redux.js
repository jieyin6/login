import axios from 'axios'
import * as types from './action-types'
import { initState } from './state'

export function user (state = initState, action) {
    switch (action.type) {
      case types.LOGIN_SUCCESS :
        return {...state, isLogin: true, user:action.payload }
      case types.ERR_MESSAGE :
        return {...state, isLogin: false, msg:action.payload}
      default :
        return state
    }
}

//action creator
const loginSuccess = (data) => {
    return {
        type:types.LOGIN_SUCCESS,
        payload: data
    }
}
//报错信息
function errorTip (msg) {
    return {
        type:types.ERR_MESSAGE,
        payload: msg
    }
}

//登录
export function Login (user, pwd) {
    if ( !user || !pwd ) {
        errorTip('您未输入用户名或密码')
    }
    console.log(user,pwd)
    return dispatch => {
        axios.post('/users/login',{
            user,
            pwd
        }).then(res => {
            if(res.data.status == 0){
                console.log('登陆成功')
                dispatch(loginSuccess(res.data.data))
            }else{
                console.log('登录失败')
                dispatch(errorTip(res.data.message))
            }
        })
    }
}
export function Register (user, pwd) {
    console.log('register axios')
    return dispatch => {
        axios.post('/users/register',{
            user,
            pwd
        }).then(res => {
            if(res.data.status == 0) {
                console.log(res.data.data)
                dispatch(loginSuccess(res.data.data))
            } else {
                console.log(res.messages)
                dispatch(errorTip(res.message))
            }
        })
    }
}