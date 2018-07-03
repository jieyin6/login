import { combineReducers } from 'redux'

import { user } from './user.redux'
import { indexReducer } from './index.redux'

export default combineReducers({user, indexReducer})