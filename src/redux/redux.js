import axios from 'axios'
import * as types from './action-types'
import { initState } from './state'

export function user (state = initState, action) {
    switch (action.type) {
      case types.LOGIN_SUCCESS :
        return state
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
//报错
function errorTip (msg) {
    return {
        msg,
        type: 'err_msg'
    }
}

//登录
export function Login ({user, pwd}) {
    if ( !user || !pwd ) {
        errorTip('您未输入用户名或密码')
    }
    console.log('axios')
    return dispatch => {
        axios.post('/users/login',{
            user,
            pwd
        }).then(res => {
            if(res.data.status == 0){
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(errorTip(res.data.message))
            }
        })
    }
    
}