import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'

import {API_DATA_TYPE, API_STATES} from '../constants/api'

export default createReducer(0, {
    [actionTypes.TOGGLE_DRAWER]: (state, action) => ({...state, isCartOpen: action.payload.open}),
    [actionTypes.SET_NOTIF]: (state, action) => ({...state, message: action.payload.message}),

})