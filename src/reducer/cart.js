import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'

import {API_DATA_TYPE, API_STATES} from '../constants/api'

export default createReducer(0, {
    [actionTypes.CART_ADD]: (state, action) => ({...state, [action.payload.item]: action.payload.item}),
    [actionTypes.CART_REMOVE]: (state, action) => {
        let newState = {...state};
        if(Object.keys(newState).includes(action.payload.item)) delete newState[action.payload.item]
        return newState
    }
})