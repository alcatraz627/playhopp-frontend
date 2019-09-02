import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

import {API_DATA_TYPE, API_STATES} from '../constants/api'

export default createReducer(0, {
    [actionTypes.CART_ADD]: (state, action) => ({...state, [action.payload.item]: action.payload.item}),
    [actionTypes.CART_REMOVE]: (state, action) => (_.omit(Object.assign({}, state), action.payload.item))
})