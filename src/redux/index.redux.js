import axios from 'axios'
import *as types from './action-types'
import { indexState } from './state'

export function indexReducer (state = indexState, action) {
    switch (action.type) {
        case types.INDEX_LIST :
            return {...state, indexList: action.payload}
        default :
            return state
    }
}

function indexList (list) {
    return {
        type: types.INDEX_LIST,
        payload: list
    }
}

export function getIndexList (type) {
    console.log(type)
    return dispatch => {
        axios.get('/users/list?type=' + type).then(res => {
            if (res.data.status == 0) {
                console.log(res.data.data)
                dispatch(indexList(res.data.data))
            }
        })
    }
}