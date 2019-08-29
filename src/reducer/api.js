import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'

import {API_DATA_TYPE, API_STATES} from '../constants/api'

export default createReducer(0, {
    [actionTypes.API_CALL]: (state, action) => ({...state, [action.payload.dataType]: API_STATES.FETCHING}),
    [actionTypes.API_RESPONSE]: (state, action) => ({...state, [action.payload.dataType]: action.payload.responseType})
})
