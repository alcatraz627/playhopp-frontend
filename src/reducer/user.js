import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'

import initialState from '../constants/initialState'

export default createReducer(0, {
    [actionTypes.LOGIN_SUCCESS]: (state, action) => ({...state, ...action.payload}),
    [actionTypes.LOGIN_FAIL]: (state, action) => ({}),

    [actionTypes.SIGNUP_SUCCESS]: (state, action) => ({...state, ...action.payload}),
    [actionTypes.SIGNUP_FAIL]: (state, action) => ({}),

    [actionTypes.LOGOUT]: (state, action) => ({...state, ...initialState.user}),

    [actionTypes.SET_USER]: (state, action) => ({...state, ...action.payload.data})
})