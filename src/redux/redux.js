import axios from 'axios'
import * as types from './action-types'
import { initState } from './state'

export function user (state = initState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS :
            return {
                ...state, 
                isLogin: true, 
                user: action.payload.user, 
                type: action.payload.type
                }
        case types.ERR_MESSAGE :
            return {...state, isLogin: false, msg: action.payload}
        case types.IS_UPDATE :
            return {...state, isUpdate: action.payload}
        case types.INDEX_IS_LOGIN :
            return {...state, ...action.payload}
        default :
            return state
        }
    }

//action creator
const loginSuccess = (data) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    }
}
//报错信息
function errorTip (msg) {
    return {
        type: types.ERR_MESSAGE,
        payload: msg
    }
}
// 更新 
function updateAction (msg) {
    return {
        type: types.IS_UPDATE,
        payload: msg
    }
}
//判断是否登录
function indexIsLogin (msg) {
    return {
        type: types.INDEX_IS_LOGIN,
        payload: msg
    }
}
//登录
export function Login (user, pwd) {
    if ( !user || !pwd ) {
        errorTip('您未输入用户名或密码')
    }
    console.log(user, pwd)
    return dispatch => {
        axios.post('/users/login', {
            user,
            pwd
        }).then(res => {
            if (res.data.status == 0) {
                console.log('登陆成功')
                dispatch(loginSuccess(res.data.data))
            } else {
                console.log('登录失败')
                dispatch(errorTip(res.data.message))
            }
        })
    }
}
//注册
export function Register (user, pwd, radio) {
    console.log('register axios')
    return dispatch => {
        axios.post('/users/register', {
            user,
            pwd,
            radio
        }).then(res => {
            if (res.data.status == 0) {
                console.log(res.data.data)
                dispatch(loginSuccess(res.data.data))
            } else {
                console.log(res.data.messages)
                dispatch(errorTip(res.data.message))
            }
        })
    }
}
//更新数据
export function Update(data, user) {
    console.log('update axios')
    if(initState.type === 'boss') {
     return dispatch => {
        axios.post('users/updateInfo', {
            user: user,
            job: data.job,
            company: data.company,
            salary: data.salary,
            request: data.request
        }).then(res => {
            console.log(res.data.data)
            if (res.data.state == 0) {
                dispatch(updateAction(true))
            } else {
                dispatch(errorTip(res.data.message))
            }
        })
      }
    } else {
        return dispatch => {
            axios.post('users/updateInfo', {
                user: user,
                job: data.job,
                position: data.position,
                salary: data.salary,
                mine: data.mine
            }).then(res => {
                console.log(res.data.data)
                if (res.data.state == 0) {
                    dispatch(updateAction(true))
                } else {
                    dispatch(errorTip(res.data.message))
                }
            })
        }
    }
}