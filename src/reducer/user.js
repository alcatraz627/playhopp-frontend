import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'


export default createReducer(0, {
    [actionTypes.LOGIN_SUCCESS]: (state, action) => ({...state, ...action.payload}),
    [actionTypes.LOGIN_FAIL]: (state, action) => ({}),

    [actionTypes.REGISTER_SUCCESS]: (state, action) => ({}),
    [actionTypes.REGISTER_FAIL]: (state, action) => ({}),

    // [actionTypes.GET_USER]: (state, action) => ({...state, ...action.payload.data})
})